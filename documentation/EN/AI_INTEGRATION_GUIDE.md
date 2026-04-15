# AI Integration Guide

## For Agent Runtimes & Dev Platforms
Integrating `team-agents-cowork` requires zero deep coupling with your platform.

### Required Bootstrapping
1. Generate `.agent-state/workflow/dispatch.json`.
2. Connect your agent to the MCP Server located at `src/mcp-server/`.

### Expected State Transitions
Your agent must parse `dispatch.json`. If `current_gate` is `result_review_pending`, your executor agent MUST HALT and yield execution to your independent Gatekeeper container.

The Gatekeeper container evaluates `verify_execution_compliance`, returning an exact `Approved` or `Rejected` payload to `decision.json`.
