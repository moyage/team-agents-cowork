# Protocol 07: Feedback & Rework (反馈收集与上游返修)

在实际的 Agent 团队协作中，瀑布流很难一气呵成。本协议规范了如何在中途“反向打回”以及如何收集“摩擦反馈”。

## 1. 需求池与反馈收集机制
所有参与开发的节点（无论是人类还是 Agent）在遇到阻力时，都应主动记录反馈：
- **摩擦日志 (Friction Log)**: 记录小范围的体验问题或工具卡点，使用 `templates/FRICTION_LOG.md`。
- **问题报告 (Problem Report)**: 记录阻碍主流程推进的 Bug 或规范缺失，使用 `templates/PROBLEM_REPORT.md`。
- 所有产出的反馈文件应存放在 `tasks/feedback/` 目录下，定期由 `scripts/build_demand_pool.py` (或等效的人工 Review) 收拢至统一的 `tasks/demand-pool.md` 中。

## 2. 流程中途上游返修支持
严禁下游 Agent (如 Developer) 擅自绕过 Spec 进行硬编码。如果发现上游设计有误，必须遵循返修协议：
1. **阻断当前任务**: 立即停止 Build 动作，标记当前实现为 `blocked-by-upstream`。
2. **发起修订请求**: 实例化 `templates/UPSTREAM_REVISION.md`。
3. **人类审批**: 由 Reviewer 或 Architect 评估修订请求。
4. **状态流转**:
   - `draft` -> `in-review` -> `accepted` (批准修改上游文档)
   - 上游文档 (如 Spec) 修订后，版本号升迁（如 `v1.0` -> `v1.1`）。
   - 被替换的旧规则文件可标记为 `superseded`，原执行任务状态重置为 `revised` 并恢复 Build。
