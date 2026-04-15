# Installation & Configuration

## Prerequisites
- Node.js (for the MCP server and initialization script)
- Python 3 (for legacy utility scripts, pending deprecation)

## 1. Quick Initialization (New Projects)
Navigate to your project directory and run the initialization script:
```bash
node /path/to/team-agents-cowork/bin/agent-protocol-init
```
This will:
- Inject IDE-specific adapters (e.g., `.cursorrules`, `CLAUDE.md`).
- Generate the initial `workflow/dispatch.json` state.
- Build the `src/mcp-server/`.

## 2. MCP Server Configuration
To allow your AI to read the protocol state:
Add the server to your AI environment's configuration (e.g., Cursor's MCP settings, Claude Desktop config).
```json
{
  "team-agents-cowork": {
    "command": "node",
    "args": ["/path/to/team-agents-cowork/src/mcp-server/build/index.js"]
  }
}
```

## 3. Environment Variables
- `PROJECT_ROOT`: (Optional) Specifies the root directory of your project. If omitted, the MCP server defaults to `process.cwd()`.
