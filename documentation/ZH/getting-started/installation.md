# 安装与初始化

要在您的代码库中建立 `team-agents-cowork` 并设置 L2/L3 边界：

### 1. 全局安装 (可选)
本安装包目前正在准备发布至公共 NPM 注册表。

如果通过公共 NPM 包安装时提示 404 错误，请手动克隆该仓库并进行本地全局安装：

```bash
git clone https://github.com/moyage/team-agents-cowork.git
npm install -g ./team-agents-cowork
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
