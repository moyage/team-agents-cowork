# 风险登记册 (Risk Register)

## 1. 高危操作边界 (Risk Boundaries)
本协议框架内定义以下为高危操作，Agent **必须** 向人工请求显式授权，严禁静默执行：
1. **根配置篡改**: 修改根目录的核心 CI/CD YAML 配置文件。
2. **协议重写**: 在未获 Phase 1 (Solution Docs) 授权前直接篡改 `protocol/` 目录内容。
3. **版本与发布**: 执行 Git tag、推送 main 分支及任何真实对外 release 动作。

## 2. 审批矩阵 (Approval Matrix)
| 阶段类别 | 动作 | 审批要求 |
| --- | --- | --- |
| 需求理解 | 确认 Task Breakdown | 需人工 `确认` |
| 编码阶段 | 生成/覆盖非核心业务代码 | Agent 自动决策 (携带 PoW) |
| 安全边界 | 篡改流水线 / 构建脚本 | 必须人工 `授权` |
| 发布阶段 | 打标签、执行部署脚本 | 必须人工 `授权` |

## 3. 防幻觉与 Agentic Sycophancy 控制
- **风险**: Agent 谎称测试通过。
- **缓解机制**: 所有的自动化脚本 (如 `doctor.py`, `verify_protocol.py`) 必须输出 Exit Code 0，且将物理 stdout 日志随 PR 一并提交为证明 (PoW)。\n