# 核心协作循环 (Core Collaboration Loop)

团队中人类与 AI Agent 的协作是一场长期的接力赛。本指南汇集了 V0.3 中建立的核心协作闭环机制。

## 1. 提交反馈与沉淀需求池
- **如何提交**: 任何角色在开发中遇到摩擦，应复制 `templates/PROBLEM_REPORT.md` 或 `templates/FRICTION_LOG.md` 并填写，然后存入 `tasks/feedback/` 目录。
- **如何沉淀**: 运行 `python3 scripts/build_demand_pool.py`。该脚本会自动聚合散落的反馈文件，并更新到 `tasks/demand-pool.md`，供架构师在下一轮规划中抓取。

## 2. 流程中途触发上游返修
- **触发时机**: 当在 Build (编码) 或 Verify (验证) 阶段，发现上游 Spec 存在漏洞或无法实现时。
- **操作步骤**:
  1. 暂停编码，禁止擅自“发挥”或绕过 Spec。
  2. 实例化 `templates/UPSTREAM_REVISION.md`。
  3. 将返修请求提交给负责架构的 Reviewer。
- **标记状态**: 在返修文件中明确标记 `status: in-review`。上游修复后，将其改为 `status: accepted`，并在旧版 Spec 加上 `status: superseded`，然后继续向下游推进。

## 3. 多轮迭代的平滑演进 (Multi-Iteration)
- **迭代过渡**: 每个周期封板时，必须填写 `templates/ITERATION_SUMMARY.md`。
- **状态转移**: 将旧的执行文档归档至 `retros/`。未完成的项必须显式落入新一轮的 `tasks/vNext-backlog.md` 或搁置清单 `tasks/deferred-to-vNext.md`。
- **机器可读状态**: 更新 `workflow/iteration-state.json`，让 Agent 能实时感知当前项目处于哪个迭代及哪个阶段（如 Plan / Build）。

*(注：本机制的首批实践样本即是当前的 V0.2 -> V0.3 切分。你可以查看 `tasks/v0.3-backlog.md` 及 `tasks/deferred-to-v0.3.md` 来了解真实的迭代继承是如何进行的。)*
