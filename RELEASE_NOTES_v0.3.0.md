# Release Notes - v0.3.0

**发布日期:** 2026-04-13

## 🚀 目标与摘要
Team Agent Collaboration Protocol V0.3.0 是一个重要的成熟度里程碑。本次发布的核心目标是解决“大范围普及的易用性”与“多主体协作中的防篡改安全”，并打通了从上游需求到本地代码的多轮协作流转回路。此版本完全抛弃了旧称“MTP”，在架构与术语上进行了全面净化。

## 🌟 新增核心能力
1. **网络一键零依赖注入 (Remote Distribution)**:
   - 全新设计的 `install.sh` 利用 `mktemp` 提供 `curl | bash` 级的即插即用体验。用户无需克隆完整项目即可向自己的项目实施协议注入。
2. **IDE 环境自动嗅探 (Auto-Sniffing)**:
   - 增加 `--ide auto` 参数，安装脚本现可智能探测当前工程使用的 AI 伴生 IDE（如 Cursor、Trae、Claude Code 等），并自动应用最契合的底层适配规则。
3. **协作流程结构化 (Collaboration Loop)**:
   - 新增摩擦日志 (`FRICTION_LOG.md`)、上游返修 (`UPSTREAM_REVISION.md`) 和项目多轮演进 (`ITERATION_SUMMARY.md`) 规范。
   - 附带 Python 聚类脚本，可一键提取各成员的反馈并生成汇总的需求池。
4. **防篡改安全 CI (Protocol Integrity Guard)**:
   - 为极高风险的基础引擎与规则模板确立了 SHA-256 指纹基线 (`integrity-manifest.json`)。
   - 提供本地快速验证工具，并集成了基于 GitHub Actions 的提交自动门禁，物理层面阻绝 AI Agent 发生严重幻觉时篡改协议规则的行为。

## 🔧 维护侧变更
- `workflow/iteration-state.json` 被正式确立为机器可读的状态流转入口。
- 文档结构大幅清晰化：分为 `docs/`（核心原理）、`tasks/`（活跃实施）、`retros/`（历史归档）。

## ⚠️ 已知限制 (Deferred)
- **多仓库跨端同步**: 当前网络安装后是纯本地化运行。如果主库的协议更新，暂未提供一条命令同步老项目的能力，需要在后续版本解决。
- **深层故障定位体验**: `mktemp` 创建临时文件夹如果因极罕见的权限问题报错，用户需手动翻阅输出流以找寻沙箱路径。

## 🎯 向前看 (V0.4 Direction)
下个版本 V0.4 我们将迎来核心的转变 —— **Automated Workflow Orchestration** (工作流编排)。我们将探讨如何利用现有的防篡改基线和状态协议，构建由引擎（如 MCP 或 Action）自动化推进的多智能体接力开发模型。
