# Architecture: A Multi-Agent Collaboration Framework

The **Team Agents Cowork** architecture moves beyond legacy interceptor patterns, positioning itself as a comprehensive **Multi-Agent / Multi-AI Coding Collaboration Framework**. 

## The 6-Stage Multi-Agent Architecture

```mermaid
graph TD
    subgraph Harness & Workflow
        A1[Pluggable Adapters]
        A2[State Machine]
    end
    
    subgraph Orchestration
        B1[Collaboration Contract]
    end
    
    subgraph Execution & Evaluation
        C1[Cursor Agent]
        C2[Trae Agent]
        C3[OpenCode Agent]
        D1[Evaluation Rubrics]
    end
    
    subgraph Acceptance
        E1[Gatekeeper Approval]
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

## Core Design Principles

1. **Low Cognitive Load:** The architecture abstracts away the friction of synchronizing disparate AI tools. You only need to define the collaboration contract.
2. **Low Invasiveness:** We do not force IDE unification. Whether a team member uses Cursor, OpenCode, or Trae, the framework integrates seamlessly via **pluggable adapters**.
3. **Stateless Governance Engine:** `team-agents-cowork` operates as a stateless engine. State is abstracted to a local `.agent-state/` folder within the target repository.
4. **Contract Enforcement over Code Interference:** We enforce *how* the state transitions and verify *acceptance criteria*, rather than strictly monitoring the Git diff character-by-character.
