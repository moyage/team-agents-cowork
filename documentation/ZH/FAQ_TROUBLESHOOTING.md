# 常见问题与排错

## 1. 为什么我的 Agent 一直卡在 Review Pending？
因为独立的 Gatekeeper 没有运行。在个人模式下，请确保 `npm run mcp` 开启，且你手动触发了 SubAgent (通过 `opencode run ...`) 去做 Review，或者你安装了后台 Daemon 脚本。

## 2. 为什么系统拒绝我的 Commit？
系统严格执行 `allowed_files` 验证。如果你试图在同一个 Commit 中同时修改了 `dispatch.json` (状态流转) 和业务代码，Gatekeeper 会物理拦截。请使用 `git reset HEAD~1` 分离你的提交。
