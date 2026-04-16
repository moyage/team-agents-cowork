# V0.8.5 Kickoff Packet: The Epic Leap (Headless Worktree & MCP Context Spoofing)

## 1. Background & Context
Iteration V0.8 laid the theoretical and organizational groundwork for a heterogeneous multi-agent collaboration framework, adopting YAML DAGs and the L2/L3 dual-track gating model. However, the framework currently suffers from a critical operational flaw in Team Mode: "Fake Concurrency." If multiple agents (e.g., Cursor and Opencode) attempt to execute parallel tasks on the same local directory, Git index locks and IDE indexing crashes are inevitable. 

To achieve true Archon-grade physical isolation without Archon's heavy SQLite database dependency, V0.8.5 will implement a "Serverless, Git-Driven, Headless Worktree" architecture powered by MCP Context Spoofing.

## 2. North Star Objective
> "Transform the `team-agents-cowork` MCP server from a passive state-reader into an active Filesystem Proxy. Implement Git Worktree isolation so that every claimed task is executed in a hidden, ephemeral physical sandbox. Provide a clean `uninstall` command to completely wipe the framework and its sandboxes from a repository."

## 3. Core Requirements (V0.8.5 Epic Scope)
1. **The Uninstall Command:** Add a `team-agents-cowork uninstall` command to the CLI router to safely remove `.agent-state/`, update `.gitignore`, and `git worktree prune` orphaned sandboxes.
2. **The Worktree Manager:** Build `src/mcp-server/src/worktree-manager.ts` to programmatically execute `git worktree add`, `commit`, `push`, and `remove`.
3. **MCP Context Spoofing (Filesystem Proxy):** Extend `src/mcp-server/src/index.ts`. Expose new MCP tools (`cowork_read_file`, `cowork_write_file`, `cowork_list_directory`). When an Agent calls these tools, the MCP server must intercept the path and seamlessly redirect it to the active task's hidden Git Worktree sandbox (e.g., `.cowork-sandboxes/<task_id>/`).
4. **Documentation Sync:** Update the architecture diagrams and documentation to explain this ultimate physical isolation mechanism.

## 4. Execution Discipline
This is a massive architectural shift affecting the core Node.js runtime (`src/mcp-server/`). Execution will be split into multiple phases to ensure stability. Every phase MUST pass the isolated Gatekeeper review.
