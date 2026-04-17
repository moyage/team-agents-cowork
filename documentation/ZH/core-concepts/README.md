# 核心概念 (Core Concepts)

欢迎阅读 Team Agents Cowork 核心概念白皮书库。本章节是理解整个框架 L0-L6 驾驭工程范式与底层机制的理论基石，提供 Archon 级别的深度剖析。

我们摒弃了黑盒式的堆叠设计，通过严谨的架构工程和理论推演，打造出具有确定性、可解释和高扩展性的多智能体协同系统。

## 目录与导读

本章节涵盖以下深度主题白皮书：

- **[双轨网关机制 (dual-track-gating.md)](./dual-track-gating.md)**
  解析系统如何根据输入复杂度动态在不同的路由轨道上进行智能分发。

- **[双模式编排 (dual-mode-orchestration.md)](./dual-mode-orchestration.md)**
  深度剖析系统的双重编排模式：Solo (黑盒独立执行) 与 Team (L3 DAG编排执行)。讲解其背景、定义、特性差异及应用场景。

- **[工作区模式切换 (workspace-modes.md)](./workspace-modes.md)**
  探讨单人并发 (Local Concurrent) 与团队远程隔离 (Remote Isolated) 的状态管理机制，解析底层配置覆盖与文件系统级别的状态隔离防护。

- **[YAML DAG 引擎 (yaml-dag-engine.md)](./yaml-dag-engine.md)**
  详细介绍确定性任务编排的核心——YAML DAG（有向无环图）引擎。解析拓扑排序、依赖解析及并行执行机制。

- **[系统治理协议 (governance-protocols.md)](./governance-protocols.md)**
  探讨 L2 节点与 L3 编排器之间的物理防线与边界隔离原则，以及如何通过治理协议防止多智能体系统失控。

- **[概念三位一体 (the-triumvirate.md)](./the-triumvirate.md)**
  宏观阐述“合约 (Contracts)、工作流 (Workflows)、治理 (Governance)”三大支柱如何支撑起高可用的智能体生态系统。

## 建议阅读路径
建议先阅读**双模式编排**与**YAML DAG 引擎**以建立对系统运行机制的直观理解，随后可深入研读**治理协议**与**工作区模式切换**，掌握企业级应用所需的安全、隔离与状态控制知识。