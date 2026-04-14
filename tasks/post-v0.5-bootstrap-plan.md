# Bootstrap / Installability Proposal Summary (Post-V0.5)

## 1. Goal
Simplify the setup, deployment, and validation process of the `team-agents-cowork` framework for both individual developers and team collaboration scenarios. 

## 2. Current State Assessment
- The existing `install.sh` and `install.ps1` scripts download the repository and perform environment sniffing (`.cursorrules`, `.traerules`, `AGENTS.md`) to dynamically inject configuration.
- A `setup.sh` and `Makefile` exist.
- Python tools (`scripts/doctor.py`) co-exist with a Node-based MCP server (`src/mcp-server/`).
- The `workflow/` and `tasks/` directories come pre-populated with V0.4/V0.5 history upon cloning.

## 3. Proposal: Unified Bootstrap Script (The "Init" command)
We need a robust `init` script (e.g., `bin/agent-protocol-init`) that:

1. **Dependency Checking:** Validates Node.js (for the MCP Server), Git, and Python (if legacy tools are retained).
2. **State Initialization:**
   - Detects if `workflow/dispatch.json` exists. If not, it generates a fresh, empty iteration state (e.g., `V1.0`, `kickoff_pending`).
   - Wipes or ignores the pre-existing `tasks/` history from the cloned repository. 
3. **MCP Server Installation:** Automatically runs `npm ci` and `npm run build` inside `src/mcp-server/`.
4. **IDE/Agent Integration:** Prompts the user to inject the appropriate adapter (`adapters/CURSOR_RULES.tpl`, etc.) into their local workspace.
5. **Minimal Validation:** Runs a `smoke-test` (similar to M4's `test-client.ts`) to ensure the MCP server responds on stdio and reads the initialized `dispatch.json`.

## 4. Differentiated Scenarios

### Individual Developer (Dev/Demo Mode)
- **Entrance:** `curl -sL https://.../install.sh | bash`
- **Behavior:** The script assumes a greenfield project. It injects the `.cursorrules` directly into the current working directory, initializes a blank `dispatch.json`, and starts the MCP server in the background (or provides instructions to configure it in Claude Code/Cursor).

### Team Collaboration Scenario
- **Entrance:** A dedicated `init --team` flag or script.
- **Behavior:** Checks for an existing `protocol/` or `.agent-rules/` folder to ensure team members are pulling the *shared* canonical source-of-truth rather than generating local overrides. It ensures the MCP server is configured to read the team's shared `workflow/` state.

## 5. Next Steps
1. Refactor `install.sh` and `setup.sh` to include the Node.js MCP server build steps.
2. Ensure the bootstrap process generates clean, blank state files (`dispatch.json`, `iteration-state.json`) for new users, preventing them from inheriting the V0.5 history.
