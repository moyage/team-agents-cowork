# 概念三位一体

借鉴于成熟的开源工作流，`team-agents-cowork` 建立在三大支柱之上：

1. **意图 (Contract):** 也就是 `execution-contract.json`，在数学上界定 AI 的权限边界。
2. **流转 (YAML DAG):** 用于编排 AI 任务与 Bash 命令依赖关系的 `.yaml` 文件。
3. **治理 (Isolation):** 物理隔离 *执行者*（写代码的 Agent）与 *把关者*（审查代码的 Agent）。
