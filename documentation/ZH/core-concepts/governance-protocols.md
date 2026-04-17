# 系统治理与规范协议

为了在长时间运行的多智能体工作流中防止“AI盲从幻觉 (Agentic Sycophancy)”、“认知退化 (Cognitive Degradation)”与“Token 爆炸”，`team-agents-cowork` 框架强制执行以下编排纪律。

## 1. 飞行前检查单 (Pre-Execution Intent Declaration)
在协调者 (L2) 为复杂任务触发任何工具、终端命令或文件修改之前，它**必须**向人类输出一份结构化的意图声明。
这能强制大语言模型在行动前锚定其注意力。

**必须包含的格式：**
*   **目标 (Target):** 正在构建/修复什么。
*   **复杂度 (Complexity):** 低/中/高。
*   **策略 (Strategy):** 将如何执行（例如，“派发给 Opencode” 或 “使用 delegate_task”）。
*   **依据 (Reasoning):** 为什么选择此策略而不是自己手写。

## 2. 严格的职责分离 (SoD) 与智能委派
物理禁止协调者 (L2) 使用简陋的 Shell 脚本（如 `cat/echo/python`）“手搓”复杂的源代码或文档补丁。

**双态编排 (Dual-Mode Orchestration)：** 框架通过 `delegation_mode` 属性（`blackbox` 或 `orchestrated`）支持混合方法：

*   **对于编码任务（黑盒模式 Blackbox Mode）：** 协调者必须使用 `opencode-bridge run <task> --verify="<verify_command>"` 将工作派发给 L3 黑盒执行环境。在 OpenCode v3.0 标准下，L2（协调者）仅负责编写测试脚本/验证探针，L3 (OpenCode) 自主选择智能体和模型来执行解决方案。L2 绝不能微观管理 OpenCode 的内部逻辑。
*   **对于专项任务（编排模式 Orchestrated Mode）：** 对于需要人类在环 (human-in-the-loop)、QA 或架构审查的任务，L2 切换到 `orchestrated` 模式。它使用 `delegate_task` 生成具备独立上下文的隔离子智能体 (SubAgent)，并指定 `capability_requirements`（例如 `["cursor-human-in-loop"]`），从而将特定的子任务路由到高度专业化的纯智能体或环境。

## 3. 反 Token 爆炸与上下文钉选 (Context Pinning)
随着迭代的深入，聊天记录会急剧膨胀，导致 LLM 遗忘早期的系统约束 (`SYSTEM_PROMPT`)。
*   **上下文隔离：** 永远不要把海量的 `git diff` 输出或构建日志塞入主对话中。使用 `delegate_task`，让子智能体去消化这些噪音，并只向主脑返回干净的 JSON 摘要。
*   **状态驱动的注入：** `dispatch.json` 的门禁状态（如 `contract_review_pending`）天然作为一个“上下文图钉 (Context Pin)”，强制协调者唤醒其在状态机中的精确定位，而不依赖冗长的对话记忆。
