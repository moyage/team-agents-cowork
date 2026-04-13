# Workflow Orchestrator Evaluation (V0.4 前置评估)

## 评估目标
V0.3 构建了完整的底层防篡改、规范模板和状态文件机制。评估的重点在于回答：**如何让这些静态文件能够自动驱动多智能体分工，而无需人类反复使用 CLI 手动衔接？**

## 待回答的核心问题
1. **引擎选型**: 我们应该采用完全基于 Git/GitHub Actions 的事件驱动模型，还是采用基于本地常驻进程 (Local Daemon / MCP Server) 的轮询模型？
2. **状态注入**: Orchestrator 如何提取 `iteration-state.json` 与 `demand-pool.md`，并将精简后的 Context 分发给不同职责的 Agent（Planner/Coder/Reviewer）？
3. **安全拦截**: 在自动流转中，如何利用 V0.3 的防篡改 CI 阻断 Agent 的越权操作并及时通知人类？

## 候选方案粗选
- 方案 A: **完全基于 GitHub Actions** (最轻量，契合现有 CI，强异步)。
- 方案 B: **MCP (Model Context Protocol) Server 集成** (直接由 Agent 动态调用工具进行状态改变)。
- 方案 C: **定制 Local Python 守护脚本** (类似 OpenCode Bridge 的扩大版)。

*评估正在进行中...*
