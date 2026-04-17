# Team Agents Cowork

## 📌 项目定位 (Project Positioning)
**Team Agents Cowork** 是一个**生产级、低侵入、协议优先**的多智能体 (Multi-Agent) 协同编程框架。
它专为**个人开发者 (Solo)** 和**分布式团队 (Team)** 设计，旨在解决大语言模型 (LLM) 在面对复杂软件工程时产生的“幻觉”、“代码冲撞”和“上下文爆炸”等致命问题。本框架不强迫你更换你喜欢的 IDE (Cursor/Trae) 或底层 AI Coding 工具 (OpenCode/Kimi Code)，而是通过一套标准化的文件协议和物理沙箱，将它们无缝串联成流水线。

## 💡 背景 (Background)
随着 AI 编码助手的普及，我们遇到了新的瓶颈：
- **幻觉与盲目自信**：AI 经常宣称“任务已完成”，但实际上代码连编译都过不了（Agentic Sycophancy）。
- **并发灾难**：让多个 AI 在同一个本地目录同时写代码，会导致 Git 锁死和 IDE 索引崩溃（Fake Concurrency）。
- **职责混淆**：既写代码又当裁判的 AI，永远测不出自己的漏洞。

为此，我们开发了 Team Agents Cowork。它引入了物理级的沙箱隔离、双态的调度引擎和极其严苛的审计网关。

## 🏛️ 理论范式 (Theoretical Paradigm)
本框架严格遵循 [Curvature Labs] 的 **Harness Engineering (驾驭工程) L0-L6 架构**：

- **L0 (基础设施)**: 底层大模型、物理机与原生 Git。
- **L1 (基础协议)**: `.agent-state/` 目录下的 JSON/YAML 文件总线（摒弃繁重的数据库与常驻服务器）。
- **L2 (执行编排 - Hermes)**: 主脑 Orchestrator。只负责制定计划、编写测试探针和分发任务，**绝对禁止**主脑自己手写业务代码。
- **L3 (专业黑盒执行 - OpenCode/Kimi)**: 具体的 Coding 引擎。接收 L2 下发的 `TaskSpec`，在一个完全隔离的沙箱中疯狂输出。
- **L4 (验证与准入)**: 单点物理防幻觉探针（CLI 必须 `exit 0` 才算通过）。
- **L5 (评估审查)**: 交叉视角的隔离审查网关。
- **L6 (战略进化)**: Backlog 沉淀与动态协议演进。

## ⚙️ 系统架构 (Architecture)
L2 主脑与 L3 执行层通过物理工作区进行完全隔离与协作。

```mermaid
graph TD
    User([人类开发者]) -->|发起任务| L2(L2 Orchestrator - Hermes主脑)
    
    subgraph 物理隔离协议总线 [物理层: .agent-state/]
        DAG[YAML DAG 任务契约]
        TaskSpec[标准 TaskSpec (需求+测试探针)]
    end
    
    L2 -->|1. 拆解生成| DAG
    L2 -->|2. 挂载物理探针| TaskSpec
    
    subgraph L3 执行引擎池 [L3 Executors]
        OC[OpenCode 组合环境]
        KC[Kimi Code 极速引擎]
        SA[SubAgent 隔离子体]
    end
    
    TaskSpec -->|3. 路由分发| L3
    
    subgraph 沙箱层 (Sandboxes)
        Main[主工作区 (Solo 并发态)]
        WT[Headless Worktree (Team 隔离态)]
    end
    
    L3 -->|4. 物理读写| 沙箱层
    沙箱层 -->|5. 探针验证返回| L2
```

## 🚀 主要功能深度剖析 (Core Features)

### 1. 个人域/团队域 工作区模式切换 (Solo / Team Workspace Mode)
- **背景与场景**: 一个人在本地开发时，希望最快的反馈循环，不希望代码被推来推去；但团队远程协作时，必须防止张三的 Agent 和李四的 Agent 修改同一个文件引发冲突。
- **功能定义**: 框架级别的运行时形态切换。
- **特性**:
  - **个人域 (Solo)**: 资源共享。所有并发 Agent 在同一本地根目录下作业，依靠文件锁防冲撞。速度极快。
  - **团队域 (Team)**: 零信任隔离。利用 `MCP Headless Worktrees` 技术，为每一个远端分配的任务动态克隆隐藏的 Git 工作树，互不干扰，完成审查后再合入主线。
- **使用范例**: 
  ```bash
  # 一个人周末在家爆肝开发
  team-agents run feature.yaml --mode=solo
  
  # 接管远程团队分配的史诗级重构
  team-agents run epic-refactor.yaml --mode=team
  ```

### 2. 双态编排模式 (Dual-Mode Orchestration)
- **背景与场景**: 有些任务（如写个单测）扔给自带环境的 AI 工具就能搞定；有些任务（如全库语法升级）需要绕过中间件，直接用纯粹的大模型算力硬砸。
- **功能定义**: 在 DAG 节点中定义的执行力度控制。
- **特性**:
  - **黑盒模式 (Blackbox)**: 默认模式。L2 只提供验收标准，将控制权完全移交给像 OpenCode 这样的 L3 组合环境。成本低，省心。
  - **自由编排 (Orchestrated)**: 夺回控制权模式。直接调度裸机算力（如 `kimi-code-official` 100 Tokens/s），或指定具有 `human-in-loop` 能力的界面端代理介入。
- **使用范例 (YAML)**:
  ```yaml
  delegation_mode: orchestrated
  capability_requirements: ["kimi-code-official"]
  ```

### 3. 内置工作流 vs 自定义工作流
- **背景与场景**: 80% 的日常开发（如需求到PR、修Bug、写测试）是标准化的；但 20% 的硬核场景（如企业特定的灰度发布验证）是独一无二的。
- **特性**:
  - **18个内置流**: 开箱即用。详见 [内置工作流全景图](./documentation/ZH/reference/built-in-workflows.md)。
  - **自定义流**: 支持在 `.agent-state/workflows/` 下自由拼装 Bash 脚本、黑盒 Agent 与人机交互节点。详见 [自定义工作流设计指南](./documentation/ZH/guides/authoring-workflows.md)。

## 🏁 快速开始 (Quick Start)

### 1. 安装与初始化
```bash
# 1. 全局安装 CLI
npm install -g team-agents-cowork

# 2. 进入你的业务项目根目录
cd /my-app

# 3. 初始化协议沙箱 (安全，不污染源码)
team-agents init
```

### 2. 常用命令
| 命令 | 适用场景 | 执行动作 |
|------|----------|----------|
| `team-agents init` | 首次接入框架 | 生成 `.agent-state/`、`registry.json` 与 `dispatch.json`。 |
| `team-agents run <yaml>` | 开启一段开发流 | 解析指定的 DAG 文件，拆分任务并路由给底层的 L3 引擎。 |
| `team-agents review` | 触发卡点审查 | 当流水线处于 `review_pending` 状态时，唤醒独立审计 Agent（或人工）执行隔离判决。 |
| `team-agents mcp` | 启动数据总线 | 暴露本机的 `team-agents-cowork-mcp` 服务，供外部 IDE (如 Cursor) 挂载读取当前任务态。 |

## 📚 核心知识库 (Documentation Center)
> 我们全面采用 **Chinese-First (中文优先)** 策略，大幅降低团队认知负荷。

- 📖 **[18 个内置工作流白皮书 (Built-in Workflows)](./documentation/ZH/reference/built-in-workflows.md)**: 所有模板的适用场景、Mermaid 图解与触发条件。
- 🛠️ **[自定义工作流实战指南 (Authoring Workflows)](./documentation/ZH/guides/authoring-workflows.md)**: 手把手教你编写复杂的混合协同 DAG。
- 🧠 **[双态编排核心概念 (Dual-Mode Orchestration)](./documentation/ZH/core-concepts/dual-mode-orchestration.md)**: 彻底搞懂 Blackbox 与 Orchestrated 的权衡。
- 🏢 **[工作区模式核心概念 (Workspace Modes)](./documentation/ZH/core-concepts/workspace-modes.md)**: 详解 Solo 与 Team 模式下的物理隔离沙箱原理。
- ⚖️ **[系统治理与职责分离 (Governance & SoD)](./documentation/ZH/core-concepts/governance-protocols.md)**: 防幻觉与 L2/L3 黑盒切割法则。

---
*English users: Please refer to [README_EN.md](./README_EN.md) and the `documentation/EN/` directory for translated specifications.*
