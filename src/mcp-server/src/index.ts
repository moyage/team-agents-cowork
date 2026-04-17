#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import { execFile } from "child_process";
import { promisify } from "util";
import { createWorktree, commitAndPushWorktree, removeWorktree } from "./worktree-manager.js";

// Global state to track if the connected Agent is currently scoped to a task worktree
let activeTaskWorktreePath: string | null = null;
let activeTaskId: string | null = null;


const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function resolveWorkflowStatePath(projectRoot: string, fileName: string) {
  const agentStatePath = path.resolve(
    projectRoot,
    ".agent-state",
    "workflow",
    fileName
  );

  try {
    await fs.access(agentStatePath);
    return agentStatePath;
  } catch {
    return path.resolve(projectRoot, "workflow", fileName);
  }
}

const server = new Server(
  {
    name: "team-agents-cowork-mcp",
    version: "0.5.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "cowork_start_task",
        description: "Claims a task and creates an isolated Git Worktree sandbox for it. All subsequent file operations will be transparently redirected to this sandbox.",
        inputSchema: {
          type: "object",
          properties: {
            task_id: { type: "string" },
            base_branch: { type: "string", description: "Default is 'agent-sync'" },
            contract_path: { type: "string" }
          },
          required: ["task_id"]
        }
      },
      {
        name: "cowork_read_file",
        description: "Read a file from the repository. If a task is active, it reads from the isolated worktree sandbox.",
        inputSchema: {
          type: "object",
          properties: {
            file_path: { type: "string", description: "Relative path to the file (e.g. src/app.js)" }
          },
          required: ["file_path"]
        }
      },
      {
        name: "cowork_write_file",
        description: "Write content to a file. If a task is active, it writes to the isolated worktree sandbox.",
        inputSchema: {
          type: "object",
          properties: {
            file_path: { type: "string" },
            content: { type: "string" }
          },
          required: ["file_path", "content"]
        }
      },
      {
        name: "cowork_list_directory",
        description: "List directory contents. If a task is active, lists the isolated sandbox.",
        inputSchema: {
          type: "object",
          properties: {
            dir_path: { type: "string" }
          },
          required: ["dir_path"]
        }
      },
      {
        name: "cowork_finish_task",
        description: "Commits the worktree sandbox, pushes to the remote branch, and optionally destroys the sandbox.",
        inputSchema: {
          type: "object",
          properties: {
            commit_message: { type: "string" },
            destroy_worktree: { type: "boolean", description: "Whether to destroy the sandbox after pushing" }
          },
          required: ["commit_message"]
        }
      },
      {
        name: "get_iteration_state",
        description: "Read the current iteration state of the team-agents-cowork repository.",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      {
        name: "verify_execution_compliance",
        description: "Verify that actual file changes in Git match the allowed_files constraint defined in the execution contract.",
        inputSchema: {
          type: "object",
          properties: {
            baseline_commit: {
              type: "string",
              description: "The baseline Git commit hash or reference to compare against."
            },
            contract_path: {
              type: "string",
              description: "Absolute or relative path to the execution contract JSON file."
            }
          },
          required: ["baseline_commit", "contract_path"],
        },
      },
      {
        name: "get_execution_diff",
        description: "Get the semantic file diffs for a given Git commit or baseline.",
        inputSchema: {
          type: "object",
          properties: {
            baseline_commit: {
              type: "string",
              description: "The baseline Git commit hash or reference to compare against."
            }
          },
          required: ["baseline_commit"],
        },
      },
      {
        name: "get_dispatch_state",
        description: "Read the canonical workflow routing state (dispatch.json).",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "cowork_start_task") {
    try {
      const args = request.params.arguments as any;
      const projectRoot = process.env.PROJECT_ROOT || process.cwd();

      // Determine delegation mode from optional contract_path
      let delegationMode = "blackbox";
      if (args && args.contract_path) {
        try {
          const contractPathInput = args.contract_path as string;
          const contractAbsolute = path.isAbsolute(contractPathInput)
            ? contractPathInput
            : path.resolve(projectRoot, contractPathInput);
          const contractData = await fs.readFile(contractAbsolute, "utf-8");
          const contractJson = JSON.parse(contractData);
          delegationMode = contractJson.delegation_mode || "blackbox";
        } catch {
          // If contract can't be read or parsed, default to blackbox per spec
          delegationMode = "blackbox";
        }
      }

      if (delegationMode === "orchestrated") {
        activeTaskWorktreePath = await createWorktree(projectRoot, args.task_id, args.base_branch);
      } else {
        // blackbox: do not create a new worktree; use project root
        activeTaskWorktreePath = projectRoot;
      }
      activeTaskId = args.task_id;

      if (delegationMode === "orchestrated") {
        return {
          content: [{ type: "text", text: `Task ${args.task_id} claimed. Worktree Sandbox created at ${activeTaskWorktreePath}. All cowork_* file tools are now physically redirected to this sandbox.` }]
        };
      } else {
        return {
          content: [{ type: "text", text: `Task ${args.task_id} claimed. Delegation mode: blackbox. Sandbox path set to ${activeTaskWorktreePath}.` }]
        };
      }
    } catch (error: any) {
      return { content: [{ type: "text", text: `Error starting task sandbox: ${error.message}` }], isError: true };
    }
  }

  if (request.params.name === "cowork_read_file") {
    try {
      const args = request.params.arguments as any;
      const projectRoot = process.env.PROJECT_ROOT || process.cwd();
      const targetBase = activeTaskWorktreePath ? activeTaskWorktreePath : projectRoot;
      const targetPath = path.resolve(targetBase, args.file_path);
      
      // Robust Security boundary check ensuring path segment containment
      const resolvedBase = path.resolve(targetBase);
      if (!targetPath.startsWith(resolvedBase + path.sep) && targetPath !== resolvedBase) {
        throw new Error("Path traversal blocked");
      }
      
      const content = await fs.readFile(targetPath, "utf-8");
      return {
        content: [{ type: "text", text: content }]
      };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Error reading file: ${error.message}` }], isError: true };
    }
  }

  if (request.params.name === "cowork_write_file") {
    try {
      const args = request.params.arguments as any;
      const projectRoot = process.env.PROJECT_ROOT || process.cwd();
      
      if (!activeTaskWorktreePath) {
        throw new Error("cowork_write_file requires an active task sandbox. Please call cowork_start_task first to prevent polluting the main repository.");
      }
      
      const targetPath = path.resolve(activeTaskWorktreePath, args.file_path);
      const resolvedBase = path.resolve(activeTaskWorktreePath);
      if (!targetPath.startsWith(resolvedBase + path.sep) && targetPath !== resolvedBase) {
        throw new Error("Path traversal blocked");
      }
      
      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, args.content, "utf-8");
      
      return {
        content: [{ type: "text", text: `Successfully wrote ${args.file_path} to isolated sandbox for task ${activeTaskId}.` }]
      };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Error writing file: ${error.message}` }], isError: true };
    }
  }

  if (request.params.name === "cowork_list_directory") {
    try {
      const args = request.params.arguments as any;
      const projectRoot = process.env.PROJECT_ROOT || process.cwd();
      const targetBase = activeTaskWorktreePath ? activeTaskWorktreePath : projectRoot;
      const targetPath = path.resolve(targetBase, args.dir_path);
      
      const resolvedBase = path.resolve(targetBase);
      if (!targetPath.startsWith(resolvedBase + path.sep) && targetPath !== resolvedBase) {
        throw new Error("Path traversal blocked");
      }
      
      const items = await fs.readdir(targetPath);
      return {
        content: [{ type: "text", text: items.join('\n') }]
      };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Error listing directory: ${error.message}` }], isError: true };
    }
  }

  if (request.params.name === "cowork_finish_task") {
    try {
      const args = request.params.arguments as any;
      const projectRoot = process.env.PROJECT_ROOT || process.cwd();
      
      if (!activeTaskWorktreePath || !activeTaskId) {
        throw new Error("No active task sandbox to finish.");
      }
      
      await commitAndPushWorktree(activeTaskWorktreePath, args.commit_message);
      
      if (args.destroy_worktree !== false) {
        await removeWorktree(projectRoot, activeTaskId);
      }
      
      const finishedId = activeTaskId;
      activeTaskWorktreePath = null;
      activeTaskId = null;
      
      return {
        content: [{ type: "text", text: `Task ${finishedId} finished. Changes committed and pushed to agent-sync. Sandbox context cleared.` }]
      };
    } catch (error: any) {
      return { content: [{ type: "text", text: `Error finishing task sandbox: ${error.message}` }], isError: true };
    }
  }

  if (request.params.name === "verify_execution_compliance") {
    try {
      const args = request.params.arguments as any;
      const baseline_commit = args.baseline_commit;
      const contract_path = args.contract_path;
      if (!baseline_commit || !contract_path) {
        throw new Error("baseline_commit and contract_path are required");
      }

      const projectRoot = process.env.PROJECT_ROOT || process.cwd();

      // Read and parse the contract
      const absoluteContractPath = path.resolve(projectRoot, contract_path);
      const contractData = await fs.readFile(absoluteContractPath, "utf-8");
      const contract = JSON.parse(contractData);
      const allowedFiles = contract.allowed_files || [];

      const { stdout } = await execFileAsync("git", ["diff", "--name-only", baseline_commit], { cwd: projectRoot });
      
const changedFiles = stdout.split('\n').map(f => f.trim()).filter(f => f.length > 0);
      
      // Determine drift
      const uncontractedFiles = changedFiles.filter(file => !allowedFiles.includes(file));
      const compliant = uncontractedFiles.length === 0;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              compliant,
              allowed_files: allowedFiles,
              changed_files: changedFiles,
              uncontracted_files: uncontractedFiles,
              drift_detected: !compliant
            }, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to verify execution compliance: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  if (request.params.name === "get_execution_diff") {
    try {
      const args = request.params.arguments as any;
      const baseline_commit = args.baseline_commit;
      if (!baseline_commit) {
        throw new Error("baseline_commit is required");
      }

      const projectRoot = process.env.PROJECT_ROOT || process.cwd();
      const { stdout } = await execFileAsync("git", ["diff", baseline_commit], { cwd: projectRoot });

      return {
        content: [
          {
            type: "text",
            text: stdout || "No differences found.",
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to get execution diff: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  if (request.params.name === "get_dispatch_state") {
    try {
      const projectRoot = process.env.PROJECT_ROOT || process.cwd();
      const dispatchPath = await resolveWorkflowStatePath(
        projectRoot,
        "dispatch.json"
      );
      const data = await fs.readFile(dispatchPath, "utf-8");
      return {
        content: [
          {
            type: "text",
            text: data,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to read dispatch state: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  if (request.params.name === "get_iteration_state") {
    try {
      const projectRoot = process.env.PROJECT_ROOT || process.cwd();
      const iterationPath = await resolveWorkflowStatePath(
        projectRoot,
        "iteration-state.json"
      );
      const data = await fs.readFile(iterationPath, "utf-8");
      return {
        content: [
          {
            type: "text",
            text: data,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to read iteration state: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Team Agents Cowork MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
