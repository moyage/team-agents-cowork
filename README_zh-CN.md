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

---

## 📚 17 个内置工作流 (LLM 智能路由驱动)

本引擎内置了 17 个从企业级标准移植的高频 DAG 工作流。您只需用自然语言描述意图，LLM 路由器会自动选择并执行最完美的流水线：

| 工作流 ID | 描述 | 核心触发场景 / 用途 |
|---|---|---|
| `assist` | 常规问答、Debug 与代码探索 | 您在探索代码库，或需要排查没有明确计划的 Bug。 |
| `fix-github-issue` | 问题分类 → 计划 → 实现 → 验证 → PR → 智能审查 → 自我修复 | 您提供了一个 GitHub Issue 链接/ID，希望 AI 全链路解决。 |
| `idea-to-pr` | 灵感 → 计划 → 实现 → 验证 → PR → 5 线程并行审查 → 自我修复 | 基于一个模糊的点子，从零开始实现一个新特性。 |
| `plan-to-pr` | 执行已有计划 → 实现 → 验证 → PR → 审查 → 自我修复 | 您已经写好了详细设计文档 (`SPEC_TEMPLATE.md`) 并希望执行它。 |
| `issue-review-full` | 综合修复 + 针对 GitHub Issue 的多智能体深度审查 | 需要极其严格审计的高风险 GitHub Issue。 |
| `smart-pr-review` | 评估 PR 复杂度 → 运行目标导向的审查智能体 → 综合结果 | 智能评估并审查一个现有的 Pull Request。 |
| `comprehensive-pr-review` | 5 个审查者并行审查的自动修复管线 | 从多个不同维度对 PR 进行深度的穷尽式代码审计。 |
| `create-issue` | 问题分类 → 收集上下文 → 调查 → 创建 GitHub Issue | 将一个简单的 Bug 描述收集为规范详尽的 GitHub Issue。 |
| `validate-pr` | 深度验证测试（对比 main 与 feature 分支） | 在代码合并前运行极其严苛的验证测试。 |
| `resolve-conflicts` | 侦测合并冲突 → 分析双方代码 → 解决冲突 → 验证 → 提交 | 代码库陷入 rebase 或 merge 冲突卡死的状态时使用。 |
| `feature-development` | 根据计划实现特性 → 验证 → 提交 PR | 用于实现一个范围和定义都极其明确的具体功能块。 |
| `architect` | 架构扫描、复杂度降低、代码库健康体检 | 降低技术债或进行高阶的架构宏观审阅。 |
| `refactor-safely` | 结合类型检查与行为验证的安全重构 | 在绝对不改变外部行为的前提下，重构优化现有代码。 |
| `ralph-dag` | 迭代式 PRD 故事点实现循环 | 用于逐个 Story 拆解并实现整份宏大 PRD 需求文档。 |
| `remotion-generate` | 使用 AI 生成或修改 React 视频组件 | 专用于 Remotion 视频框架的任务。 |
| `test-loop-dag` | 迭代式故障分析与修复套件 | 循环修复崩溃的测试用例，直到全部通过。 |
| `piv-loop` | 包含人工检查点的 计划-实现-验证 循环 | 适用于需要高度人工控制和过程干预的极高风险开发。 |

---

## 🛠️ 定制化工作流与团队协同 (Custom Authoring)

框架不仅局限于内置的 17 个工作流，您可以在 `.agent-state/workflows/*.yaml` 中定义完全定制化的工作流，以编排团队内复杂的协作任务。

### 范例：一个自定义的 Staging 部署流水线

以下是一个将确定性 `bash` 执行节点与 `is_isolated_reviewer` AI 节点混合编排的范例。当该流水线推送到 `agent-sync` 分支时，团队内不同的 AI 智能体可以分别“认领”适合自己的节点。

```yaml
id: custom-deploy-pipeline
description: "部署到 Staging 环境并请求物理隔离的 QA 验收。"
use_when: "当用户希望将当前功能分支部署到 Staging 并测试时使用。"
nodes:
  - id: build_project
    type: bash
    command: "npm run build"
    depends_on: []
  
  - id: deploy_to_staging
    type: bash
    command: "aws s3 sync ./dist s3://staging-bucket --delete"
    depends_on: ["build_project"]
  
  - id: qa_sign_off
    type: ai_execution
    description: "在部署后的网址上执行 QA 测试。必须由隔离把关者执行。"
    is_isolated_reviewer: true
    depends_on: ["deploy_to_staging"]
```

当这套管线运行时，您本地的 Cursor 可能会认领并执行 `build` 和 `deploy` 的 bash 脚本。但 `qa_sign_off` 节点强制要求由具备 `is_isolated_reviewer` 能力的智能体（比如团队后台的 `opencode run` 守护进程或专职 QA Agent）来接手，从而实现了物理级别的“责任分离（Separation of Duties）”。

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
