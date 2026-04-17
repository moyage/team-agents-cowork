# 指南：编写工作流 (Authoring Workflows)

本指南将带您逐步了解如何使用 YAML DAG 引擎构建您的第一个 L3 编排团队。我们将创建一个简单的“研究-总结”管道。

## 先决条件

在开始之前，请确保您理解 [L0-L6 分层架构](../../README_zh-CN.md) 以及 [双轨网关](../core-concepts/dual-track-gating.md) 和 [YAML DAG 引擎](../core-concepts/yaml-dag-engine.md) 的概念。

## 步骤 1：定义全局上下文

每个工作流都从上下文开始。这设置了所有智能体都可以访问的初始状态。

创建一个名为 `research-flow.yaml` 的文件：

```yaml
version: "1.0"
name: "Market Research Flow"

global_context:
  target_market: "欧洲的电动汽车"
  max_sources: 3
```

## 步骤 2：创建 L2 节点智能体

接下来，定义将参与工作流的智能体。每个节点需要一个 `id`、一个 `agent_profile`（来自 L4 驾驭层）和一个特定的 `task`。

让我们添加一个研究智能体：

```yaml
nodes:
  - id: researcher
    agent_profile: "L2_DeepSearch"
    task: "查找 ${max_sources} 篇关于 ${target_market} 的最新新闻文章。"
    tools: ["search_api"]
```

## 步骤 3：映射依赖和数据注入

现在添加第二个智能体，它依赖于第一个智能体的输出。我们使用 `depends_on` 来强制执行顺序，并使用 `inject_context` 来传递数据。

```yaml
  - id: summarizer
    agent_profile: "L2_Analyst"
    depends_on: ["researcher"]
    task: "根据提供的研究结果撰写执行摘要。"
    inject_context:
      - source_node: "researcher"
        target_variable: "research_data"
```

## 步骤 4：定义输出

最后，指定哪个节点的输出代表工作流的最终结果。

```yaml
output: "summarizer.final_output"
```

## 步骤 5：执行工作流

使用 CLI 在团队模式下运行您新创建的工作流。

```bash
npm run start:team --workflow=research-flow.yaml
```

L3 路由器将解析 DAG，初始化 L2 `L2_DeepSearch` 智能体，等待其完成，将其数据注入 L2 `L2_Analyst` 智能体，并返回最终摘要。