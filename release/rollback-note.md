# 回滚说明 (Rollback Note)

鉴于本库为纯文本配置与协议层（无数据库模式变更，无持久化服务端应用状态），回滚策略极简：

## 1. 协议库自身回滚
- 若 `v0.1.0` 出现致命协议冲突，直接通过 Git Revert 回滚到上一个稳定 Commit。
- 命令: `git revert <commit-hash>`

## 2. 下游接入项目的回滚
- 如果下游项目（接入了 Team Agent Collaboration Protocol 规范的业务项目）遇到由新版引发的 Agent 行为异常：
  1. 移除项目根目录下的 `.cursorrules`, `AGENTS.md`。
  2. 恢复其旧版的开发规范文档。
  3. 执行 `make clean` 或本地编写的清理脚本清除本库注入的 `ci/`、`templates/` 软链接或副本。\n