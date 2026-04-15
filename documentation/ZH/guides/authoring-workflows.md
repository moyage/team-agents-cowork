# 编写自定义工作流

您可以在 `.agent-state/workflows/*.yaml` 中定义自定义的工作流。

## 示例：自定义部署流

```yaml
id: custom-deploy-pipeline
description: "部署到 Staging 并请求 QA 验证。"
use_when: "当用户希望将当前分支部署到 Staging 时使用。"
nodes:
  - id: build_project
    type: bash
    command: "npm run build"
    depends_on: []
  - id: qa_sign_off
    type: ai_execution
    description: "在部署后的网址上执行 QA 测试。"
    is_isolated_reviewer: true
    depends_on: ["build_project"]
```

LLM 路由器会自动读取 `use_when` 字段，并将用户的指令动态路由到此工作流。
