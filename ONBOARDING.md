# 👥 团队新成员 Onboarding 

欢迎加入使用 **Team Agent Collaboration Protocol** 的团队！

## 为什么我们需要这套协议？
当你使用 Cursor、Claude Code 或 Trae 时，AI 往往会“擅作主张”或者“幻觉”。这套协议的核心目的是：**让 AI 成为听话的执行者，而不是乱改核心代码的破坏者。**

## 你需要改变什么习惯？
1. **No Spec, No Code**: 不要直接让 AI "帮我写个登录页面"。先让 AI 输出一份 Markdown 的 `Task Breakdown`，你确认后再让它写代码。
2. **强制验证 (Exit Code 0)**: 协议规定 AI 必须在终端运行测试命令并看到 `0` 退出码才能认为成功。别听它说“代码看起来没问题”。
3. **高危动作授权**: 当涉及 CI 流水线、核心架构改动时，AI 会被配置为“请求人类审批”。请认真履行审批职责。

## 了解三级 Profile
- **Strict (严苛)**: 核心底层库。每一次改动都需要你的强确认。
- **Default (标准)**: 常规业务代码。AI 有一定自主权。
- **Legacy (旧项目)**: 允许在不写完整 Spec 的情况下做快速修复（见 [Legacy Migration](legacy-migration-guide.md)）。
