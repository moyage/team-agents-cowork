# Guide: Authoring Workflows

This guide walks you through the process of building your first L3 Orchestrated Team using the YAML DAG Engine. We will create a simple research-and-summarize pipeline.

## Prerequisites

Before starting, ensure you understand the [L0-L6 Layered Architecture](../../README.md) and the concepts of [Dual-Track Gating](../core-concepts/dual-track-gating.md) and the [YAML DAG Engine](../core-concepts/yaml-dag-engine.md).

## Step 1: Define the Global Context

Every workflow starts with a context. This sets the initial state that all agents can access.

Create a file named `research-flow.yaml`:

```yaml
version: "1.0"
name: "Market Research Flow"

global_context:
  target_market: "Electric Vehicles in Europe"
  max_sources: 3
```

## Step 2: Create L2 Node Agents

Next, define the agents that will participate in the workflow. Each node requires an `id`, an `agent_profile` (from the L4 Harness), and a specific `task`.

Let's add a Research Agent:

```yaml
nodes:
  - id: researcher
    agent_profile: "L2_DeepSearch"
    task: "Find ${max_sources} recent news articles about ${target_market}."
    tools: ["search_api"]
```

## Step 3: Map Dependencies and Data Injection

Now add a second agent that depends on the output of the first. We use `depends_on` to enforce execution order and `inject_context` to pass data.

```yaml
  - id: summarizer
    agent_profile: "L2_Analyst"
    depends_on: ["researcher"]
    task: "Write an executive summary based on the provided research."
    inject_context:
      - source_node: "researcher"
        target_variable: "research_data"
```

## Step 4: Define the Output

Finally, specify which node's output represents the final result of the workflow.

```yaml
output: "summarizer.final_output"
```

## Step 5: Execute the Workflow

Use the CLI to run your newly created workflow in Team Mode.

```bash
npm run start:team --workflow=research-flow.yaml
```

The L3 Router will parse the DAG, initialize the L2 `L2_DeepSearch` agent, wait for it to complete, inject its data into the L2 `L2_Analyst` agent, and return the final summary.