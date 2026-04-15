# Core Concepts & Overview

**Team Agents Cowork** is a mature **Multi-Agent / Multi-AI Coding Collaboration Framework**. It structures your personal and team development domains into an orchestrated workspace where heterogeneous AI tools (like Cursor, OpenCode, and Trae) collaborate efficiently and safely.

## What Problem Does It Solve?

Modern development relies heavily on AI coding environments. However, scaling AI introduces friction:
1. **Tool Silos & IDE Lock-in:** Forcing teams into a single IDE limits productivity.
2. **State Collision:** Multiple AI agents operating simultaneously overwrite or conflict with each other's work.
3. **High Cognitive Load:** Manually orchestrating multiple AI contexts and reviewing endless chat histories is unsustainable.

## The Solution: A 6-Stage Lifecycle

We enforce a structured, non-invasive **6-Stage Lifecycle** that guarantees code quality while maintaining Low Cognitive Load:

1. **Harness**
2. **Workflow**
3. **Orchestration/Collaboration**
4. **Execution**
5. **Evaluation**
6. **Acceptance**

## Core Constraints

Rather than acting as a rigid L2/L3 interceptor or manipulating Git diffs manually, we rely on three core pillars:

1. **Low Cognitive Load:** Abstraction of inter-agent communication. Human developers focus on the big picture.
2. **Low Invasiveness:** **Pluggable adapters** mean there is no forced IDE or Agent unification. Use the tools you prefer.
3. **Contract Enforcement:** We strictly govern the **Collaboration Contract**, state transitions, and **Acceptance Criteria**. AI agents are free to execute creatively, but they must clear the evaluation rubrics and acceptance gates.

## 5-Artifact Taxonomy

We track progress via clear JSON artifacts within the repository state:
1. `workflow/dispatch.json` (Harness & Workflow State)
2. `*-execution-contract.json` (Orchestration Intent)
3. `*-contract-review-decision.json` (Collaboration Pre-Gate)
4. `*-execution-result.json` (Execution Evidence)
5. `*-result-review-decision.json` (Acceptance Post-Gate)
