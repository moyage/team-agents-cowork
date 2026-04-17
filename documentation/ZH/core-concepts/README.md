# 核心概念与理论架构 (Core Concepts)

要真正发挥多智能体框架的威力，理解其背后的运转哲学至关重要。本目录收录了构成 Team Agents Cowork 基石的五大白皮书。

## 目录索引

### 1. [双态编排模式 (Dual-Mode Orchestration)](./dual-mode-orchestration.md)
**必读！** 解释了 L2 调度层如何根据任务复杂度，在“黑盒自治 (Blackbox - 把控制权交给像 OpenCode 这样的集成环境)”与“自由编排 (Orchestrated - 绕过集成环境，直接调度原生算力如 Kimi Code)”之间进行切换的艺术。

### 2. [工作区物理模式 (Workspace Modes - Solo vs Team)](./workspace-modes.md)
**必读！** 剖析了个人独立开发 (Solo) 与远程团队协作 (Team) 时的物理差异。详细图解了 Team 模式下独创的 `MCP Headless Worktree` (无头 Git 沙箱) 是如何解决多个 Agent 在同一个代码库里并发写入导致的灾难性锁死问题的。

### 3. [系统治理与防幻觉协议 (Governance Protocols)](./governance-protocols.md)
阐述了“智能体谄媚 (Agentic Sycophancy)”的危害，以及我们是如何通过强制物理探针验证（必须 Exit 0）和严格的 L2/L3 职责分离来构建不可穿透的审查网关的。

### 4. [双轨审查制 (Dual-Track Gating)](./dual-track-gating.md)
说明了在 DAG 流水线中，代码生成与代码审计是如何在数学和物理层面上被强行切分给不同权限的智能体的。

### 5. [YAML DAG 引擎 (YAML DAG Engine)](./yaml-dag-engine.md)
解析了我们为何放弃复杂的代码态控制流，转而使用声明式、人类可读的 YAML 有向无环图来定义整个项目的生命周期。
