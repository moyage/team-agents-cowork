# MCP API Reference (L3 Tooling)

## 1. Context API (Read-Only)

### `get_dispatch_state`
- **Purpose:** Read the canonical workflow routing state (`dispatch.json`).
- **Arguments:** `{}` (None required)
- **Role:** Typically called by the primary Orchestrator Agent to determine the current gate and active task.

### `get_execution_diff`
- **Purpose:** Get the semantic file diffs for a given Git commit or baseline.
- **Arguments:** `{"baseline_commit": "string"}` (e.g. `HEAD~1`)
- **Role:** Typically called by the Gatekeeper Reviewer Agent to securely assess what implementation changes were made against the contract scope.

### `verify_execution_compliance`
- **Purpose:** Verify that actual file changes in Git match the allowed_files constraint defined in the execution contract.
- **Arguments:** `{"baseline_commit": "string", "contract_path": "string"}`
