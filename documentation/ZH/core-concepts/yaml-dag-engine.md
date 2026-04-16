# YAML DAG 引擎

框架的心脏是 **YAML DAG (有向无环图) 引擎**。该引擎解析用户的意图，并动态地串联异构智能体。

## 运行原理
与直接调用大模型 API 不同，YAML 中的每个 AI 节点会生成一个 `execution-contract.json` (意图合约)。本地总线（Local Bus）会等待一个能力匹配的智能体（如 Cursor 或 Trae）来认领并执行该合约。

## 真实范例 1：`feature-development.yaml`
```yaml
id: feature-development
description: "根据计划实现特性 -> 验证 -> 提交 PR"
use_when: "用户想要实现一个特定的、定义明确的需求时。"
nodes:
  - id: build_feature
    type: ai_execution
    description: "按照规格说明书构建特性。"
    depends_on: []
  - id: validate_feature
    type: bash
    command: "npm test"
    depends_on: ["build_feature"]
```

## 真实范例 2：`assist.yaml`
```yaml
id: assist
description: "常规问答、Debug 与代码探索"
use_when: "用户在探索代码库或寻找 Bug。"
nodes:
  - id: analyze_request
    type: ai_execution
    description: "分析请求并提供调试策略。"
    depends_on: []
```

## 真实范例 3：`custom-deploy-pipeline.yaml`
```yaml
id: custom-deploy-pipeline
description: "部署到 Staging 并请求 QA 验证。"
use_when: "当用户希望将当前分支部署到 Staging 时使用。"
nodes:
  - id: build_project
    type: bash
    command: "npm run build"
    depends_on: []
  - id: deploy_to_staging
    type: bash
    command: "aws s3 sync ./dist s3://staging-bucket --delete"
    depends_on: ["build_project"]
  - id: qa_sign_off
    type: ai_execution
    description: "在部署后的网址上执行 QA 测试。"
    is_isolated_reviewer: true
    depends_on: ["deploy_to_staging"]
```
