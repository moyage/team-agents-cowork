# 团队协作与自定义指南 (Guides)

欢迎来到实战指南专区。本目录下的文档旨在帮助你将 Team Agents Cowork 的理论应用到具体的工程实践中。

## 目录索引

### 1. [自定义工作流实战 (Authoring Workflows)](./authoring-workflows.md)
这是本指南区**最重要**的文档。
如果你发现内置的 18 个工作流无法满足你团队奇特的 CI/CD 流程、特定的代码审查规则，或是需要引入“人类专家”与“AI Agent”的混合流水线，这篇文档将教你如何从零开始：
- 判断何时需要自定义工作流的边界。
- 编写和结构化复杂的 YAML DAG。
- 在自定义节点中灵活切换 `blackbox` 与 `orchestrated` 编排模式。
- 提供了一个真实的、涵盖构建、测试、人机交互的《灰度发布与自动化 QA 验收流》范例。

### 2. [团队协同接入指南 (Team Collaboration)](./team-collaboration.md)
教你如何配置 `manifest.yaml`，让异地团队的多个 Agent 能够通过 Git 仓库的安全拉取（Pull-model）实现任务的分配与异步执行，同时避开本地环境的互相踩踏。
