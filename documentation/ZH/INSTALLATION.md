# 安装与配置

## 前置依赖
- Node.js (用于 MCP Server 和初始化脚本)
- Python 3 (用于即将废弃的旧版辅助脚本)

## 1. 快速初始化 (新项目)
在你的项目根目录下运行初始化脚本:
```bash
node /path/to/team-agents-cowork/bin/agent-protocol-init
```
此命令将自动:
- 注入 IDE 专用的规则适配器 (如 `.cursorrules`, `CLAUDE.md`)。
- 生成初始的 `workflow/dispatch.json` 状态文件。
- 编译并构建 `src/mcp-server/`。

## 2. MCP Server 配置
要允许你的 AI 读取协议状态，请将服务器添加到你 AI 环境的配置中（例如 Cursor 的 MCP 设置，Claude Desktop 配置）。
```json
{
  "team-agents-cowork": {
    "command": "node",
    "args": ["/path/to/team-agents-cowork/src/mcp-server/build/index.js"]
  }
}
```

## 3. 环境变量
- `PROJECT_ROOT`: (可选) 指定你的项目根目录。如果未设置，MCP Server 默认使用 `process.cwd()` 进行路径解析。
