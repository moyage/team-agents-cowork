# 🔧 故障排查与恢复 (Troubleshooting)

## 常见问题
**Q1: Agent 完全无视了下发的 `.cursorrules`？**
- *排查*: 确保你在目标项目的根目录打开了 IDE。重载窗口 (`Cmd+Shift+P` -> `Reload Window`)。

**Q2: CI 拦截了我的 PR，说 "Proof of Work Missing"？**
- *恢复*: 你需要在 PR 描述中贴上你在本地运行 `make test` 且退出码为 0 的完整终端输出截图或文本日志。

**Q3: 协议把项目搞乱了，我想回退！**
- *恢复*: 协议是**非侵入式**的配置文本。运行 `/path/to/protocol-repo/scripts/uninstall.sh --target .` 即可一键清理协议相关文件。
