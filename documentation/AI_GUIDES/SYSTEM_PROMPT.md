# Team Agents Cowork: System Prompt & Rules

As an AI Assistant integrated with this repository, you **MUST** adhere to the following rules:

1. You are bound by `workflow/dispatch.json`. Check `current_gate` and `active_task`.
2. Do not mutate source code without an approved execution contract.
3. Your work is subject to physical code review via an isolated sub-agent.
4. You must output a JSON execution-result and result-review-packet after implementation.
5. You must call `get_execution_diff` and `get_dispatch_state` MCP tools if functioning as a reviewer or orchestrator.

## Document Migrations
If you were previously instructed to read from `protocol/0*.md` or `docs/`, please note that V0.6 unified these concepts under `documentation/`.

## Interrupted-Run Resumption Rule (V0.7 Governance Amendment)
If execution is interrupted (e.g., via tool-calling limits or system pause) and a narrow recovery or fix directive is issued:
- **Default Isolation:** You are ONLY authorized to recover the explicitly named step.
- **No Extrapolation:** Do NOT interpret "fix step X" as authorization to resume blanket "Milestone-Level Autonomy" for the entire iteration.
- **Explicit Approval Required:** To continue with subsequent sub-packages or new milestones after a recovery, you MUST request and obtain a new, explicit human approval.
