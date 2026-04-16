# 安装与初始化

要在您的代码库中建立 `team-agents-cowork` 并设置 L2/L3 边界：

### 1. 全局安装 (可选)
```bash
npm install -g team-agents-cowork
```

## 2. 项目初始化
在您的目标项目根目录下运行初始化命令：
```bash
npx team-agents-cowork-init
```

**该命令会做什么：**
- 在项目根目录创建 `.agent-state/` 文件夹。
- 生成初始的 `workflow/dispatch.json` 状态。
- 生成 `registry.json`，映射默认的 Hermes 和 Opencode 智能体能力。
- 将 `.agent-state/` 自动加入您的 `.gitignore` 中，确保高频状态流转仅在本地发生。

## 3. 验证安装
启动 MCP Server 允许您的本地 AI (例如 Cursor) 读取当前协议状态：
```bash
npm run mcp
```
您的代码库现在已经是一个合规的多智能体协作空间了！
