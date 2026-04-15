# 架构说明：多智能体协作框架

**Team Agents Cowork** 的架构超越了传统的拦截器模式，定位为一个全面的 **多智能体 / 多 AI 编程协作框架**。

## 6阶段多智能体架构

```mermaid
graph TD
    subgraph 治理底座与工作流 (Harness & Workflow)
        A1[可插拔适配器]
        A2[状态机]
    end
    
    subgraph 编排 (Orchestration)
        B1[协作契约]
    end
    
    subgraph 执行与评估 (Execution & Evaluation)
        C1[Cursor Agent]
        C2[Trae Agent]
        C3[OpenCode Agent]
        D1[评估准则]
    end
    
    subgraph 验收 (Acceptance)
        E1[门禁审批 (Gatekeeper)]
    end

    A1 --> A2
    A2 --> B1
    B1 --> C1
    B1 --> C2
    B1 --> C3
    C1 --> D1
    C2 --> D1
    C3 --> D1
    D1 --> E1
```

## 核心设计原则

1. **低认知负担 (Low Cognitive Load):** 架构抽象了同步多个 AI 工具的摩擦。您只需要定义协作契约。
2. **低侵入性 (Low Invasiveness):** 我们不强制 IDE 的统一。无论团队成员使用 Cursor、OpenCode 还是 Trae，该框架都通过 **可插拔适配器 (pluggable adapters)** 实现无缝集成。
3. **无状态治理引擎:** `team-agents-cowork` 作为无状态引擎运行。状态被抽象并提取至目标代码库的本地 `.agent-state/` 文件夹中。
4. **契约强制优于代码干预:** 我们强制执行状态流转和验证 **验收标准 (acceptance criteria)**，而不是严格按字符监控 Git 差异。
