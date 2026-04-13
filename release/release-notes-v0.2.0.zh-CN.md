# V0.2.0 发布说明

## 1. 版本定位
V0.2.0 是一个里程碑式的版本，标志着 Team Agent Collaboration Protocol 从纯粹的“纸面架构规范库”向“低摩擦、可快速采用的工具链产品”转型。本版本聚焦于解决 Adoption (采用度) 和 Onboarding (入职/上手) 过程中的摩擦，通过交互式脚本和非侵入式架构，帮助个人开发者和小微团队快速接入防幻觉的 Agent 协作工作流。

## 2. 本版新增 (What's New)
- **文档体系全面重构**：重写了面向使用者的 `README.md` 入口，并新增 `QUICKSTART.md`（3分钟极速上手）、`ONBOARDING.md` 和 `TROUBLESHOOTING.md`。
- **开箱即用的安装套件**：重写了 `setup.sh` 为交互式安装引导，补齐了 `install.sh` / `install.ps1` 桥接，支持免交互参数下发 (`--target`, `--ide`, `--profile`)。
- **安全回退能力**：新增 `scripts/uninstall.sh`，实现协议外壳的精准剥离，打消用户“弄坏存量项目”的顾虑。
- **老旧项目宽容模式**：引入 `legacy` Profile 及对应的迁移指南，允许无自动化测试的存量代码库以较低阻力接入。
- **物理模板同步闭环**：修复了底层分发链路，确保 `templates/` 下的规范模板（Task, PR, Spec等）被正确注入目标项目。

## 3. 为什么重要 (Why It Matters)
这一版本彻底降低了引入“防幻觉强约束”的心智负担。过去，让团队全员学习数十页的 Markdown 协议是不切实际的；现在，仅需一行命令（`./setup.sh`），所有底层限制（Cursorrules/Traerules）与团队纲领（AGENTS.md）即可物理落盘至目标项目中。它是个人域试点和小团队试运行的完美起步器。

## 4. 验证状态
- ✅ **已通过独立验收**：所有的脚本逻辑与文档描述经过了严格的一致性对齐。
- ✅ **沙箱安全演练**：在真实环境下完成了隔离注入与卸载回退测试。
- ✅ **全面统一定名**：确保了上下文术语的一致性。

## 5. 已知限制
- **自动环境嗅探缺失**：目前安装时暂无法根据目标目录自动嗅探并推断出用户当前正在使用的是 Cursor 还是 Trae，需手动干预或命令行传参。
- **规则防篡改强验证尚未启用**：本地安装后，业务开发者仍可手工修改 `.cursorrules`。防篡改门禁机制将延后至 V0.3。

## 6. 延后到 V0.3
- 自动环境嗅探器 (Auto-sniffing for target IDE)。
- 基于文件哈希比对的 GitHub Action 规则防篡改检验。
- 中央化远端分发器 (Remote cURL execution baseline)。

## 7. 使用建议
本版本达到 **Pilot-Ready** 标准。强烈推荐：
- 个人开发者在其业余项目（Side Projects）中试运行。
- 1~2 人的核心团队进行工作流磨合试点。

## 8. 升级与开始路径
- **全新接入**：请从 `README.md` 和 `QUICKSTART.md` 开始，直接运行 `./setup.sh`。
- **老旧项目**：请阅读 `legacy-migration-guide.md`，执行 `./setup.sh --profile legacy`。
