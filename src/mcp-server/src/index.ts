import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

      const { stdout } = await execAsync(`git diff --name-only ${baseline_commit}`, { cwd: projectRoot });
      
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
      const { stdout } = await execAsync(`git diff ${baseline_commit}`, { cwd: projectRoot });

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
      const dispatchPath = path.resolve(projectRoot, "workflow/dispatch.json");
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
      const iterationPath = path.resolve(projectRoot, "workflow/iteration-state.json");
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
