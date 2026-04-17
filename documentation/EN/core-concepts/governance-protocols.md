# System Governance Protocols

To prevent "Agentic Sycophancy", "Cognitive Degradation", and "Token Explosion" during long-running multi-agent workflows, the `team-agents-cowork` framework enforces the following mandatory orchestration rules.

## 1. The Pre-Flight Plan (Pre-Execution Intent Declaration)
Before the Orchestrator (L2) triggers any tools, terminal commands, or file edits for a complex task, it **must** output a structured intent declaration to the human coordinator.
This forces the LLM to ground its attention before acting.

**Required Format:**
*   **Target:** What is being built/fixed.
*   **Complexity:** Low/Medium/High.
*   **Strategy:** How it will be executed (e.g., "Dispatching to Opencode" or "Using delegate_task").
*   **Reasoning:** Why this strategy was chosen over hand-coding.

## 2. Strict Separation of Duties (SoD) & Smart Delegation
The Orchestrator (L2) is physically barred from hand-writing complex source code or documentation patches using rudimentary shell scripts (`cat/echo/python`). 

**Dual-Mode Orchestration:** The framework supports a hybrid approach via the `delegation_mode` property (`blackbox` or `orchestrated`):

*   **For standard coding tasks (Blackbox Mode):** The Orchestrator MUST use `opencode-bridge run <task> --verify="<verify_command>"` to dispatch the work to the L3 Blackbox environment. Under the OpenCode v3.0 standard, L2 (Orchestrator) simply writes the test scripts / verify probes, and L3 (OpenCode) executes the solution. The L3 blackbox chooses the agent and model autonomously; L2 NEVER micromanages OpenCode's internal logic.
*   **For specialized tasks (Orchestrated Mode):** For tasks requiring human-in-the-loop, QA, or architecture review, L2 shifts into `orchestrated` mode. It uses `delegate_task` to spawn isolated SubAgents with dedicated context, specifying `capability_requirements` (e.g. `["cursor-human-in-loop"]`) to route specific sub-tasks to highly specialized naked agents or environments.

## 3. Anti-Token-Explosion & Context Pinning
As iterations progress, chat histories expand, causing the LLM to lose sight of early constraints (`SYSTEM_PROMPT`).
*   **Context Isolation:** Never inject massive `git diff` outputs or build logs into the main conversation. Use `delegate_task` so the sub-agent absorbs the noise and returns only a clean JSON summary.
*   **State-Driven Injection:** The `dispatch.json` gate (`contract_review_pending`, etc.) inherently serves as a Context Pin, forcing the Orchestrator to recall its exact position in the state machine without relying on conversational memory.
