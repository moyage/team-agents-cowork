# 团队协作与双层同步

在远程团队中，如果让多个智能体直接向 `main` 分支推流试错记录，Git 树会瞬间崩溃。我们使用 **双层同步拓扑 (Dual-Tiered Topology)** 来彻底解决该问题。

## 详细协作流转指令

**1. 云端账本 (拉取工作)**
团队的编排者将拆分的任务合约推送到远端的 `agent-sync` 分支。
```bash
git fetch origin agent-sync
git checkout agent-sync
```

**2. 拉取认领 (The Pull Model)**
您的本地 AI 读取 `.agent-state/tasks/contract.json`。它将 `executor` 字段更新为自己的 ID 以宣示认领权：
```json
{
  "executor": "alice-cursor",
  "status": "InProgress"
}
```

**3. 本地沙盒执行**
您的本地 AI 尝试履约合约（写代码、跑测试）。所有的失败日志和自我重试都锁死在您本地的 `.agent-state/` 沙盒中，避免外泄。

**4. L3 把关者审查 (The Gatekeeper Review)**
本地测试通过后，后台守护进程触发把关者进行物理审查：
```bash
team-agents-cowork review
```
如果代码边界合法，把关者会生成包含 `Approved` 的 `decision.json`。

**5. 最终推送合并**
您将干净的代码修改与 Approved 决议合并至主干。
```bash
git checkout main
git merge agent-sync
git push origin main
```
