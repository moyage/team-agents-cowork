# 使用指南

## 个人模式 (Personal Mode)
在个人模式下，你是 **Coordinator (协调者)**，你的 IDE (如 Cursor) 是 **Executor (执行者)**。
1. 让 AI 开始开发某个需求。
2. AI 自动生成包含范围边界的执行合约 (Execution Contract)。
3. 调用一个独立的 SubAgent 审核该合约。
4. AI 实际编写代码。
5. 独立的 SubAgent 验证 git diff，生成最终的审查决议。

## 常用命令
* `npm run mcp` - 启动 MCP server，提供 `get_dispatch_state` 和 `verify_execution_compliance` 工具。
