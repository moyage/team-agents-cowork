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
