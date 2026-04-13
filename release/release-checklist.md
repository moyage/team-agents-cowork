# Release Checklist (发布检查清单)

## 准入条件 (Pre-Release Requirements)
- [x] Phase 1 方案已评审并归档。
- [x] Phase 2 工程脚手架及核心模板代码生成完毕。
- [x] Phase 3 审计已通过 (`audit-report.md`, `risk-register.md` 已生成并无 P0 问题)。
- [x] Phase 4 测试与验收已通过 (`test-report.md`, `acceptance-report.md` 已生成并确认可达发布态)。

## 发布执行动作 (Release Execution Steps) - **需人工授权**
- [ ] 检查并锁定 `VERSION` 文件为对应版本号。
- [ ] 将所有待办变更 Commit 到 `main` 追踪分支。
- [ ] 打上 Git Tag (如 `git tag v0.1.0`)。
- [ ] Push Tag 与 Commit 到远端 (`git push origin main --tags`)。

## 发布后验证 (Post-Release)
- [ ] 确保远端代码库可见。
- [ ] 确保对应的 CI 拦截器成功触发。\n