# Team Agents Cowork

![Version](https://img.shields.io/badge/version-v0.8-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

[**中文文档 (Chinese)**](./README_zh-CN.md) | [**English Documentation Portal**](./documentation/EN/README.md)

**Team Agents Cowork** is an open-source, Protocol-First Multi-Agent Collaboration Framework for AI Coding. It elevates your repository into a zero-trust workspace by orchestrating heterogeneous AI coding tools (Cursor, Trae, Copilot) through a mathematical, file-based state machine.

---

## 🛑 The Problem: Why Traditional AI Agents Fail in Teams

Modern development relies heavily on AI coding environments. However, when scaled from a single developer to a team, critical failures emerge:

1. **Agentic Sycophancy:** AI tools blindly agree with themselves and hallucinate success.
2. **State Collision:** Multiple AI agents operating simultaneously overwrite each other's work.
3. **Cognitive Load:** Reviewing endless, unstructured chat histories across different tools is unsustainable for human developers.

## 💡 The Solution: The Conceptual Triumvirate

We do not force your team to unify under a single IDE or Agent. Instead, we enforce a framework built on three pillars:

1. **The Intent (Contract):** An `execution-contract.json` that mathematically bounds what an AI is allowed to modify (e.g., `allowed_files`).
2. **The Flow (YAML DAG Engine):** Custom `.yaml` workflows that orchestrate dependencies between AI tasks and deterministic Bash scripts.
3. **The Governance (Isolation):** A strict L2/L3 Dual-Track Gating system. The AI writing the code (Executor) is physically barred from approving its own work. A separate Gatekeeper process audits the Git Diff against the Contract.

---

## ⚡ Core Features

- **Low Cognitive Load:** The built-in LLM Router dynamically parses your natural language intent and triggers the correct YAML pipeline.
- **Low Invasiveness:** Pluggable adapters. Keep using Cursor, Trae, or CLI agents.
- **Dual-Tiered Team Sync:** Let your AI fail 50 times in your local `.agent-state/` sandbox. Only push the clean, Gatekeeper-approved code to the remote `agent-sync` branch.

---

## 📚 The 17 Built-in Workflows (Powered by LLM Router)

Our engine ships with 17 built-in DAG workflows ported from enterprise-grade standards. Simply describe your intent, and the LLM Router dynamically selects and executes the perfect pipeline:

| ID | Description | Primary Trigger / Use Case |
|---|---|---|
| `assist` | General Q&A, debugging, exploration | You need to explore the codebase or debug an issue without a specific plan. |
| `fix-github-issue` | Classify issue → plan → implement → validate → PR → smart review → self-fix | You provide a GitHub issue link/ID and want it fully resolved. |
| `idea-to-pr` | Feature idea → plan → implement → validate → PR → 5 parallel reviews → self-fix | Starting a new feature from scratch based on a general idea. |
| `plan-to-pr` | Execute existing plan → implement → validate → PR → review → self-fix | You already wrote a `SPEC_TEMPLATE.md` and want to execute it. |
| `issue-review-full` | Comprehensive fix + full multi-agent review pipeline for GitHub issues | High-risk GitHub issues requiring extensive auditing. |
| `smart-pr-review` | Classify PR complexity → run targeted review agents → synthesize findings | Reviewing an existing Pull Request intelligently based on risk. |
| `comprehensive-pr-review` | Multi-agent PR review (5 parallel reviewers) with automatic fixes | Deep, exhaustive review of a PR across multiple dimensions. |
| `create-issue` | Classify problem → gather context → investigate → create GitHub issue | Formalizing a bug report into a comprehensive GitHub issue. |
| `validate-pr` | Thorough PR validation testing both main and feature branches | Running extensive validation tests before merging. |
| `resolve-conflicts` | Detect merge conflicts → analyze both sides → resolve → validate → commit | The repository is stuck in a conflicted rebase/merge state. |
| `feature-development` | Implement feature from plan → validate → create PR | Implementing a specific, well-defined feature block. |
| `architect` | Architectural sweep, complexity reduction, codebase health improvement | Performing a high-level architectural review or reducing technical debt. |
| `refactor-safely` | Safe refactoring with type-check hooks and behavior verification | Refactoring existing code without changing its external behavior. |
| `ralph-dag` | PRD implementation loop - iterate through stories until done | Implementing an entire PRD story by story. |
| `remotion-generate` | Generate or modify Remotion video compositions with AI | Working with the Remotion video framework. |
| `test-loop-dag` | Loop node test workflow - iterative counter until completion | Fixing a failing test suite iteratively. |
| `piv-loop` | Guided Plan-Implement-Validate loop with human review between iterations | A highly controlled, iterative development process with manual checkpoints. |

---

## 🛠️ Custom Authoring & Collaborative Workflows

The framework is not limited to the 17 built-ins. You can define custom workflows in `.agent-state/workflows/*.yaml` to orchestrate specific collaborative tasks across your team.

### Example: A Custom Staging Deployment Pipeline

Here is an example of combining deterministic `bash` execution with `is_isolated_reviewer` AI nodes. Because this is pushed to the `agent-sync` branch, different AI agents across the team can "claim" different nodes.

```yaml
id: custom-deploy-pipeline
description: "Deploy to staging with isolated QA sign-off."
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
    description: "Perform QA on the staging URL. Must be executed by an isolated Gatekeeper."
    is_isolated_reviewer: true
    depends_on: ["deploy_to_staging"]
```

When this pipeline runs, your local Cursor might claim and execute the `build` and `deploy` bash scripts. But the `qa_sign_off` node explicitly requires an agent with `is_isolated_reviewer` capabilities (e.g., a background `opencode run` process or a specialized QA agent), ensuring mathematical separation of duties.

---

## 🚀 Quickstart

### 1. Global Installation
```bash
npm install -g team-agents-cowork
```

### 2. Project Initialization
Inside your target project repository, run:
```bash
npx team-agents-cowork init
```
*(This scaffolds the `.agent-state/` sandboxed local bus and generates your `registry.json` capabilities).*

### 3. Connect Your AI
Start the MCP Server to allow your local AI to read the active workflow state:
```bash
team-agents-cowork mcp
```

### 4. Execute a Workflow
Have your AI claim a contract, or trigger a background review automatically:
```bash
team-agents-cowork review
```

---

## 🏗️ Architecture Overview

```mermaid
graph LR
    A[Harness Adapter] --> B[YAML DAG Workflow]
    B --> C[LLM Router & Orchestrator]
    C --> D[L2 Execution Sandbox]
    D --> E[L3 Gatekeeper Evaluation]
    E --> F[Acceptance / Merge]

    classDef stage fill:#2D3748,stroke:#4A5568,stroke-width:2px,color:#fff;
    class A,B,C,D,E,F stage;
```

---

## 📚 Deep Dive Documentation

For complete schemas, custom workflow authoring guides, and team setup instructions, visit the Documentation Center:

- **[English Documentation Portal](./documentation/EN/README.md)**
- **[中文文档中心 (Chinese Portal)](./documentation/ZH/README.md)**
