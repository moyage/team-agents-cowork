# Authoring Custom Workflows

You can define custom workflows in `.agent-state/workflows/*.yaml`.

## Example: Custom Deployment Pipeline

```yaml
id: custom-deploy-pipeline
description: "Deploy to staging with QA sign-off."
use_when: "The user wants to deploy the feature branch to staging."
nodes:
  - id: build_project
    type: bash
    command: "npm run build"
    depends_on: []
  - id: qa_sign_off
    type: ai_execution
    description: "Perform QA on the staging URL."
    is_isolated_reviewer: true
    depends_on: ["build_project"]
```

The LLM Router will automatically read the `use_when` field and route user intents to this workflow.
