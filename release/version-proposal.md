# 版本建议书 (Version Proposal)

## 建议版本号
**v0.1.0 (Initial Minor Release)**

## 升版理由
本仓库由空目录建设而来，首次系统性落地了 Team Agent Collaboration Protocol 的全套脚手架、模板和底层校验探针。
考虑到目前尚未外挂完整的样例项目验证多仓库间的复杂同步网络（存在已知遗留事项 F-001），建议采用 `0.1.0` 作为首个基线稳定版本，而非 `1.0.0`。

## 下一版本规划 (v0.2.0)
- 补充完整的 Dummy Sample Project，以物理验证跨库 Rule Sync 链路。
- 引入对特化端（Trae, Claude-Code 终端）的指令模板包。\n