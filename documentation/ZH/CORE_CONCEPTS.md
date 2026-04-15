# 核心概念与概览

**Team Agents Cowork** 是一个“协议优先”的协作系统。它通过强制异构 AI 编码工具（Cursor, OpenCode, Trae 等）遵循一个基于文件的、数学上可验证的状态机，将你的代码仓库升级为零信任的多智能体协作空间。

## 解决什么问题？
现代开发严重依赖 AI 编码环境。然而：
1. **AI 盲从与幻觉 (Agentic Sycophancy):** AI 工具会盲目确信自己成功并产生幻觉。
2. **状态冲突 (State Collision):** 多个 AI 智能体并行工作时会互相覆盖代码。
3. **心智负担 (Cognitive Load):** 让开发者去 review 冗长的对话记录是不现实的。

## 解决方案
系统强制采用 **5项核心工件法则 (5-Artifact Taxonomy)**:
1. `workflow/dispatch.json` (状态流转与门禁)
2. `*-execution-contract.json` (执行意图与边界)
3. `*-contract-review-decision.json` (前置审批/Pre-Gate)
4. `*-execution-result.json` (执行证据/Diff界定)
5. `*-result-review-decision.json` (后置审批/Post-Gate)

通过将 **Executor (执行者)** 和 **Gatekeeper (守门人)** 物理隔离，我们在数学层面上保证了 AI 代码严格符合其获批的边界。
