# V0.8.5 Milestone Map: The Headless Worktree & Clean Uninstall Epic

## V0.8.5-M1 — Clean Uninstall Capability
- **Objective:** Add the `team-agents-cowork uninstall` CLI command.
- **In-Scope:** Extend `bin/team-agents-cowork.js`. Create `bin/agent-protocol-uninstall`. Safely remove `.agent-state/`, clean `.gitignore`, and run `git worktree prune`.
- **Out-of-Scope:** No MCP Server changes yet. No documentation updates.

## V0.8.5-M2 — The Git Worktree Manager
- **Objective:** Build the core logic to create, commit, push, and remove Git Worktrees for isolated tasks.
- **In-Scope:** Create `src/mcp-server/src/worktree-manager.ts`. Implement functions wrapping `git worktree add`, `commit`, `push`, and `remove`.
- **Out-of-Scope:** No MCP tool exposure yet.

## V0.8.5-M3 — MCP Filesystem Proxy (Context Spoofing)
- **Objective:** The core leap. Expose new filesystem MCP tools and implement the path interception logic.
- **In-Scope:** Modify `src/mcp-server/src/index.ts`. Add `cowork_read_file`, `cowork_write_file`, `cowork_list_directory`. If a task is active, dynamically prepend `.cowork-sandboxes/<task_id>/` to the requested path before accessing the disk.
- **Out-of-Scope:** No documentation updates yet.

## V0.8.5-M4 — The Triumvirate Documentation Update
- **Objective:** Sync the English and Chinese documentation to proudly explain this Archon-beating, serverless, Git-driven physical isolation model.
- **In-Scope:** Update `README.md`, `README_zh-CN.md`, and the `core-concepts` pages with new Mermaid diagrams. Update `package.json` to `0.8.5`.
- **Out-of-Scope:** No code modifications.
