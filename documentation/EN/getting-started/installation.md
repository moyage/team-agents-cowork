# Installation & Initialization

To establish `team-agents-cowork` inside your repository and set up the L2/L3 boundaries:

## 1. Global Installation (Optional)
Install the CLI tool globally to have access to the `cowork` commands.
```bash
npm install -g team-agents-cowork
```

## 2. Project Initialization
Inside your target project repository, run the initialization command:
```bash
npx team-agents-cowork-init
```

**What this does:**
- Creates the `.agent-state/` folder in your project root.
- Generates the initial `workflow/dispatch.json` state.
- Generates `registry.json` mapping the default Hermes and Opencode agent capabilities.
- Adds `.agent-state/` to your `.gitignore` to ensure state is local.

## 3. Verify the Installation
Start the MCP Server to allow your local AI (e.g. Cursor) to read the active state:
```bash
npm run mcp
```
Your repository is now a compliant Multi-Agent workspace!
