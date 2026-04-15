# 治理与工作流说明

框架的核心在于严格的**阶段门禁 (Phase Gating)**。

## 中断恢复法则 (Interrupted-Run Resumption Rule)
如果系统因安全熔断而中断：
- Agent 仅被授权去恢复或修正明确被点名的那个单一步骤。
- Agent 严禁将“修复此步骤”错误解读为恢复整个 Milestone 的完全自治权。继续任何新任务必须获得人类的重新显式批准。

## 自我演化闭环 (Self-Evolution Loop)
系统能够从 JSON 工件的拒绝记录中摄取错误分类，并提出自我修复的提案合约。但所有的“自我修复”依然强制通过 Pre-Gate 和 Post-Gate 接受隔离的、对抗性的子智能体审查，彻底杜绝静默篡改。
