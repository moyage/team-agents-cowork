# Protocol 08: Multi-Iteration Evolution (多轮迭代项目演进支持)

为了避免长期运行的复杂项目中产生上下文混乱、文档过期、文件乱堆的问题，本协议定义多轮迭代的边界控制。

## 1. 迭代流转生命周期
每个迭代（Iteration / Release）必须拥有清晰的启动和收口：
- **启动期**: 从 `tasks/vX-backlog.md` 提取 Committed Scope。
- **执行期**: 动态产出 Spec、Plan 等文档。
- **收口期**: 必须实例化 `templates/ITERATION_SUMMARY.md`。

## 2. 目录规范约束
- `tasks/`：**只存放**当前正在进行的当期活动（Current Iteration）。包含当期 Backlog、进行中的反馈、执行记录。
- `retros/`：**只存放**已封板的过去历史迭代产物（Past Iterations）。每一轮结束时，应将上一轮的阶段性过程文档（如 checklist、friction log、status summary）全部转移/归档至此。
- 绝不允许在根目录散落带有时序版本的临时规划文档。

## 3. Backlog 继承与状态转移
迭代结束时，未完成的事项（Carry-over / Deferred）不能直接凭空消失：
1. 必须在当期 Iteration Summary 中显式宣判其去向。
2. 转入下一期的，写入 `tasks/vNext-backlog.md`。
3. 暂时搁置的，归入统筹性质的 `tasks/deferred-to-vNext.md`。
4. 原本的文件状态可使用 Markdown front-matter 或标签标记为：`status: deferred`。

*(注：V0.2 -> V0.3 的版本切分，即是本协议首次严格执行的实践样本。)*
