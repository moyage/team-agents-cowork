# Usage Guide

## Personal Mode
In personal mode, you are the **Coordinator** and your IDE (e.g., Cursor) is the **Executor**.
1. Ask the AI to build a feature.
2. The AI generates an execution contract.
3. You manually invoke an isolated SubAgent to review the contract.
4. The AI writes the code.
5. The isolated SubAgent verifies the git diff and generates a final result decision.

## Commands
* `npm run mcp` - Starts the MCP server exposing `get_dispatch_state` and `verify_execution_compliance`.
