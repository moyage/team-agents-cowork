# Extension Guide: Building Custom Adapters

**Team Agents Cowork** is built to be environment-agnostic. The "Pluggable Adapters" layer allows you to connect the core State Machine to any AI coding environment, CI/CD pipeline, or chat interface.

This guide explains how to build a custom adapter.

## Understanding Adapters

An adapter's primary responsibility is to act as a bridge between the host environment (e.g., an IDE plugin, a Slack bot, a CLI tool) and the `.agent-state/` JSON artifacts.

Adapters **do not** write code. They:
1. Translate user intents into a format the Orchestrator understands.
2. Read the L2 and L3 gating decisions.
3. Relay feedback back to the user or host environment.

## 1. Initializing the Harness

Your custom adapter must first be able to initialize a workflow. To do this, it should generate a `workflow/dispatch.json` file.

```json
{
  "workflow_id": "custom-wf-001",
  "status": "INITIALIZED",
  "intent": "User's raw prompt goes here",
  "source_adapter": "my-custom-adapter-v1.0"
}
```

## 2. Polling for L2 Gate Decisions

Once the Orchestrator generates the `execution-contract.json`, your adapter should monitor for the creation of the `contract-review-decision.json`.

```typescript
// Example Polling Logic
async function waitForL2Approval(taskId: string) {
  while (true) {
    const decisionFile = readFileSync(`.agent-state/${taskId}-contract-review-decision.json`);
    if (decisionFile) {
      const decision = JSON.parse(decisionFile);
      if (decision.approved) return decision;
      else throw new Error(`Contract rejected: ${decision.feedback}`);
    }
    await sleep(2000);
  }
}
```

## 3. Submitting the Execution Result

After your custom AI agent finishes generating code, the adapter must compile the evidence and submit it to the L3 Gate.

Write the `execution-result.json`:

```json
{
  "task_id": "custom-wf-001",
  "files_modified": [
    "src/new_feature.py"
  ],
  "test_output": "1 passed, 0 failed",
  "execution_time_ms": 45000
}
```

## 4. Handling L3 Gate Rejections

If the L3 Post-Gate rejects the work (e.g., because the agent modified a forbidden file), your adapter must parse `result-review-decision.json` and automatically re-prompt the host AI with the error feedback.

> **Note:** Mature adapters (like the official CLI) handle this loop autonomously, preventing the user from needing to manually tell the AI what it did wrong.
