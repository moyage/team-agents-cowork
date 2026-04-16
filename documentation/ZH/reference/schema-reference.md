# JSON Schema 约束参考

以下是 L2/L3 双轨防线系统用于限制 AI 权限边界的物理 Schema 标准。

## 执行合约 Schema (Execution Contract)
该 Schema 强制规定了 L2 执行者必须遵守的数学边界（如 `allowed_files`）。

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

## 执行结果 Schema (Execution Result)
L2 执行者在完成任务后，声明其执行结果时必须遵守的 JSON 结构。

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

## 审查决议 Schema (Review Decision)
L3 隔离把关者（Gatekeeper）用于批准或驳回任务的 JSON 结构。

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
