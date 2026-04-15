# Usage Guide

## Personal Mode

In personal mode, you act as the **Coordinator** and your IDE (e.g., Cursor) is the **Executor**. The framework ensures your AI maintains focus and strictly verifies its own output.

### Step-by-Step Example

1. **Harness Initialization**
   Ask the Orchestrator to start a new task.
   ```bash
   npx team-agents-cowork init "Build user authentication module"
   ```

2. **Drafting the Contract**
   The Orchestrator AI drafts the `execution-contract.json`.
   ```json
   {
     "task_id": "auth-module-01",
     "description": "Implement JWT based authentication",
     "allowed_files": [
       "src/auth/auth.service.ts",
       "src/auth/auth.controller.ts"
     ],
     "acceptance_criteria": [
       "Must pass npm run test:auth",
       "Must not modify src/users/ core entities"
     ]
   }
   ```

3. **L2 Pre-Gate Approval**
   Manually or automatically invoke an isolated SubAgent to review the contract.
   ```bash
   npx team-agents-cowork review-contract auth-module-01
   ```

4. **Execution**
   Instruct your IDE's AI (e.g., Cursor Composer) to implement the feature based *strictly* on `.agent-state/auth-module-01-execution-contract.json`.

5. **L3 Post-Gate Verification**
   The isolated SubAgent verifies the git diff against the contract.
   ```bash
   npx team-agents-cowork verify-result auth-module-01
   ```

## Commands Reference

* `npm run mcp` - Starts the MCP server exposing `get_dispatch_state` and `verify_execution_compliance`.
* `npx team-agents-cowork init <prompt>` - Bootstraps the `.agent-state` directory and creates a `dispatch.json`.
* `npx team-agents-cowork review-contract <task-id>` - Evaluates the proposed contract for state collision.
* `npx team-agents-cowork verify-result <task-id>` - Runs diff analysis and evaluation rubrics to generate `result-review-decision.json`.

> **Warning:** Do not modify JSON artifacts in `.agent-state/` by hand. Always use the CLI commands to transition state safely.
