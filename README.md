# Team Agent Collaboration Protocol (协议工程基座)

> **停止让 Agent 盲目猜测。用统一的团队协议对齐人与 AI。**

本仓库是 Team Agent Collaboration Protocol 的核心配置源。它提供了一套**可插拔、可验证、防幻觉**的 5-Step 工作流体系，用于桥接“个人 IDE (Cursor/Trae)” 与 “团队复杂项目”。

## 🚀 新人指引 (First-Touch)
- **想在 3 分钟内给自己的项目用上？** 👉 [查看 QUICKSTART](QUICKSTART.md)
- **团队刚刚引入这套规范，我该怎么配合？** 👉 [查看 ONBOARDING](ONBOARDING.md)
- **老旧存量项目怎么接入？** 👉 [查看 Legacy Migration Guide](legacy-migration-guide.md)
- **遇到 Agent 乱写代码或者报错？** 👉 [查看 Troubleshooting](TROUBLESHOOTING.md)

## 📦 一键安装
在终端运行交互式安装程序，为目标项目安全注入协议：
```bash
./setup.sh
```

## 🛠 核心能力
1. **统一门禁**：物理防幻觉探针 (`doctor.py`, `verify_protocol.py`)，不再依赖口头 prompt。
2. **多终端桥接**：动态下发 `.cursorrules`, `.traerules`, `AGENTS.md`。
3. **安全审计**：具备完整的 QA / CI / 回退 机制。
