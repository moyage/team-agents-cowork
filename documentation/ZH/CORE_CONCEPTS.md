# 概览与核心概念

**Team Agents Cowork** 是一个成熟的 **多智能体 / 多 AI 编程协作框架 (Multi-Agent / Multi-AI Coding Collaboration Framework)**。它将个人和团队的开发领域构建为一个精心编排的工作区，异构的 AI 工具（如 Cursor、OpenCode 和 Trae）可以在此安全、高效地协作。

## 解决的问题

现代开发严重依赖 AI 编程环境。然而，扩展 AI 会带来新的摩擦：
1. **工具孤岛与 IDE 锁定:** 强制团队使用单一的 IDE 会限制生产力。
2. **状态冲突:** 多个并发运行的 AI Agent 可能会相互覆盖或产生工作冲突。
3. **高认知负担:** 手动协调多个 AI 上下文并审查冗长的对话历史对于人类开发者而言是不可持续的。

## 解决方案：6阶段生命周期

我们强制执行结构化、低侵入性的 **6阶段生命周期**，在保持低认知负担的同时保证代码质量：

1. **治理底座 (Harness)**
2. **工作流 (Workflow)**
3. **编排与协作 (Orchestration/Collaboration)**
4. **执行 (Execution)**
5. **评估 (Evaluation)**
6. **验收 (Acceptance)**

## 核心约束

我们不作为僵化的 L2/L3 拦截器或手动干预 Git 差异，而是依靠三大支柱：

1. **低认知负担 (Low Cognitive Load):** 抽象了 Agent 间的通信。人类开发者可以专注于全局视角。
2. **低侵入性 (Low Invasiveness):** **可插拔适配器 (pluggable adapters)** 意味着不强制统一 IDE 或 Agent。使用您偏好的工具。
3. **契约强制 (Contract Enforcement):** 我们严格治理 **协作契约 (Collaboration Contract)**、状态流转以及 **验收标准 (Acceptance Criteria)**。AI Agent 可以自由地发挥创意执行任务，但必须通过评估准则和验收门禁。

## 5大产物分类学 (5-Artifact Taxonomy)

我们通过代码库状态中清晰的 JSON 产物来跟踪进度：
1. `workflow/dispatch.json` (底座与工作流状态)
2. `*-execution-contract.json` (编排意图)
3. `*-contract-review-decision.json` (协作前置审批)
4. `*-execution-result.json` (执行证据)
5. `*-result-review-decision.json` (验收后置审批)
