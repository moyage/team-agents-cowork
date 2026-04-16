# Team Agents Cowork

![Version](https://img.shields.io/badge/version-v0.8-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

[**English (英文)**](./README.md) | [**中文文档中心**](./documentation/ZH/README.md)

**Team Agents Cowork** 是一个开源的、协议优先（Protocol-First）的多智能体 AI 编程协作框架。它通过基于文件和数学验证的状态机，来编排异构的 AI 编码工具（Cursor, Trae, Copilot），从而将你的代码仓库升级为零信任的多智能体协作空间。

---

## 🛑 面临的挑战：为什么传统的 AI 智能体在团队中会失效？

现代开发已经严重依赖 AI 编码环境。然而，当应用场景从“单兵作战”扩展到“团队协作”时，会出现以下致命问题：

1. **AI 盲从与幻觉 (Agentic Sycophancy):** AI 工具会盲目确信自己成功并自己批准自己。
2. **状态碰撞 (State Collision):** 多个 AI 智能体并行工作时，会互相覆盖物理代码。
3. **极高的心智负担 (Cognitive Load):** 让人类开发者去审查散落在各个工具里的冗长聊天记录是不可持续的。

## 💡 解决方案：概念三位一体

我们不强制您的团队统一使用单一的 IDE 或 Agent。相反，我们强制推行一套建立在三大支柱上的框架：

1. **意图 (Contract / 合约):** 通过 `execution-contract.json` 在数学层面界定 AI 的修改权限（如 `allowed_files`）。
2. **流转 (YAML DAG 引擎):** 自定义 `.yaml` 工作流，用于编排 AI 节点和确定性的 Bash 脚本。
3. **治理 (Isolation / 隔离):** 严格的 L2/L3 双轨防线门禁。负责写代码的 AI (执行者) 被物理禁止批准自己的代码。必须由一个独立的 Gatekeeper 进程根据合约来审计 Git Diff。

---

## ⚡ 核心特性

- **低认知负担:** 内置 LLM 路由器动态解析您的自然语言意图，并触发正确的 YAML 管线。
- **低侵入性:** 可插拔的适配器设计。继续使用您喜欢的 Cursor、Trae 或 CLI 智能体。
- **双层团队同步 (Dual-Tiered Sync):** 让您的 AI 在本地的 `.agent-state/` 沙盒里失败 50 次，只把经过 Gatekeeper 批准的干净代码推送到远程的 `agent-sync` 分支。
- **17 个内置工作流:** 开箱即用的企业级 DAG 管线（如 `idea-to-pr`, `smart-pr-review`, `test-loop-dag` 等）。

---

## 🚀 快速开始

### 1. 全局安装
```bash
npm install -g team-agents-cowork
```

### 2. 项目初始化
在您的目标项目根目录下运行：
```bash
npx team-agents-cowork-init
```
*(这会构建 `.agent-state/` 隔离总线，并生成包含您环境能力的 `registry.json`)*。

### 3. 连接您的 AI
启动 MCP Server，允许您的本地 AI 读取实时工作流状态：
```bash
npm run mcp
```

### 4. 执行工作流
让您的 AI 认领合约，或自动触发后台双轨审查：
```bash
agent-protocol-review
```

---

## 🏗️ 架构概览

```mermaid
graph LR
    A[接入适配器] --> B[YAML DAG 工作流]
    B --> C[LLM 路由与编排]
    C --> D[L2 执行沙盒]
    D --> E[L3 把关者审查]
    E --> F[验收与合并]

    classDef stage fill:#2D3748,stroke:#4A5568,stroke-width:2px,color:#fff;
    class A,B,C,D,E,F stage;
```

---

## 📚 深度文档与指南

有关完整的 JSON Schema 约束、自定义工作流编写指南以及团队接入说明，请访问完整的文档中心：

- **[中文文档中心](./documentation/ZH/README.md)**
- **[English Documentation Portal](./documentation/EN/README.md)**
