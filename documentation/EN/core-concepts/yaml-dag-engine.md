# The YAML DAG Engine

At the heart of the framework is the **YAML Directed Acyclic Graph (DAG) Engine**. This engine parses your intent and dynamically connects heterogeneous agents.

## How It Works
Instead of directly executing prompts, each AI node in the YAML generates an `execution-contract.json`. The Local Bus waits for an Agent (matching the required capabilities) to claim and execute the contract.

## Concrete Example 1: `feature-development.yaml`
```yaml
id: feature-development
description: "Implement feature from plan -> validate -> create PR."
use_when: "The user wants to implement a specific, well-defined feature."
nodes:
  - id: build_feature
    type: ai_execution
    description: "Build the feature according to the specifications."
    depends_on: []
  - id: validate_feature
    type: bash
    command: "npm test"
    depends_on: ["build_feature"]
```

## Concrete Example 2: `assist.yaml`
```yaml
id: assist
description: "General Q&A, debugging, and exploration."
use_when: "The user is exploring the codebase or searching for bugs."
nodes:
  - id: analyze_request
    type: ai_execution
    description: "Analyze the request and provide a debugging strategy."
    depends_on: []
```

## Concrete Example 3: `custom-deploy-pipeline.yaml`
```yaml
id: custom-deploy-pipeline
description: "Deploy to staging with QA sign-off."
use_when: "The user wants to deploy the feature branch to staging."
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
    description: "Perform QA on the staging URL."
    is_isolated_reviewer: true
    depends_on: ["deploy_to_staging"]
```
