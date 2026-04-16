# Schema Reference

Below is the definitive JSON Schema used by the L2/L3 dual-track gating system.

## Execution Contract Schema
This schema dictates the mathematical boundaries the AI Executor (L2) must obey.

```json
{
  "type": "object",
  "required": [
    "task_id",
    "role",
    "owner",
    "status",
    "goal",
    "allowed_files",
    "required_outputs",
    "must_run_commands",
    "forbidden_actions",
    "acceptance_gate"
  ],
  "properties": {
    "task_id": { "type": "string" },
    "role": { "type": "string" },
    "owner": { "type": "string" },
    "status": {
      "type": "string",
      "enum": [
        "Assigned",
        "InProgress",
        "Blocked",
        "Completed"
      ]
    },
    "goal": { "type": "string" },
    "allowed_files": { "type": "array" },
    "required_outputs": { "type": "array" },
    "must_run_commands": { "type": "array" },
    "forbidden_actions": { "type": "array" },
    "acceptance_gate": { "type": "string" }
  }
}

```

## Execution Result Schema
The JSON structure required when an AI Executor (L2) claims it has finished a task.

```json
{
  "type": "object",
  "required": [
    "task_id",
    "executor",
    "status",
    "files_modified",
    "files_created",
    "commands_run",
    "claims",
    "evidence_files",
    "risks",
    "needs_review"
  ],
  "properties": {
    "task_id": { "type": "string" },
    "executor": { "type": "string" },
    "status": {
      "type": "string",
      "enum": [
        "Completed",
        "Blocked",
        "Failed"
      ]
    },
    "files_modified": { "type": "array" },
    "files_created": { "type": "array" },
    "commands_run": { "type": "array" },
    "claims": { "type": "array" },
    "evidence_files": { "type": "array" },
    "risks": { "type": "array" },
    "needs_review": { "type": "boolean" }
  }
}

```

## Review Decision Schema
The JSON structure the isolated Gatekeeper (L3) uses to Approve or Reject the task.

```json
{
  "type": "object",
  "required": [
    "task_id",
    "reviewer",
    "decision",
    "summary",
    "checked_files",
    "rejected_claims",
    "accepted_claims",
    "follow_up"
  ],
  "properties": {
    "task_id": { "type": "string" },
    "reviewer": { "type": "string" },
    "decision": {
      "type": "string",
      "enum": [
        "Approved",
        "Rejected",
        "NeedsMoreEvidence"
      ]
    },
    "summary": { "type": "string" },
    "checked_files": { "type": "array" },
    "rejected_claims": { "type": "array" },
    "accepted_claims": { "type": "array" },
    "follow_up": { "type": "array" }
  }
}

```
