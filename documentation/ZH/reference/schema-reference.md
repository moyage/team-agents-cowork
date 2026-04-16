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
