# AI 集成实施指南

## 面向 Agent Runtime 与开发平台
集成 `team-agents-cowork` 不需要与你的平台进行任何深度的强耦合。

### 必要的启动步骤
1. 生成 `.agent-state/workflow/dispatch.json`。
2. 将你的智能体连接到位于 `src/mcp-server/` 的 MCP Server。

### 状态流转期望
你的 Agent 必须监听 `dispatch.json`。如果 `current_gate` 是 `result_review_pending`，你的执行智能体**必须挂起 (HALT)**，并将控制权交接给独立的 Gatekeeper 审查容器。

Gatekeeper 容器调用 `verify_execution_compliance` 进行客观校验，并输出精确的 `Approved` 或 `Rejected` JSON 决议。
