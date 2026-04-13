# 01 - 团队协作核心协议 (Team Collaboration Protocol)

## 核心箴言：Trust, but verify physically.
杜绝“代码已完成，看起来没问题”（Agentic Sycophancy）。任何脱离物理凭证的进度报告都是无效的。

## 协作红线
1. **无 Spec 不编码**：严禁在缺少明确目标和非目标 (Non-Goal) 约束的情况下启动代码生成。
2. **无物理验证不合入**：Agent 生成的代码必须通过测试脚本、Lint 或其他探针证明 Exit Code 为 0。
3. **禁止执行者越权**：负责具体编码的 Agent (如 Opencode / Claude Code) 无权单方面宣布任务完成，必须交由总控机制 (Hermes / Reviewer / CI) 验收。
