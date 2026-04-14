# Comparison with labs-teamwork-spec

## 1. Overview & Positioning
Both `team-agents-cowork` and `labs-teamwork-spec` are scaffolding and enforcement toolkits designed to bridge multi-LLM, multi-agent, and multi-IDE engineering governance. However, their philosophies and architectural implementations differ significantly.

### `team-agents-cowork` (Current Repo)
- **Goal:** Protocol Validation & Compliance via a Stateful Execution Engine.
- **Philosophy:** Emphasizes a rigid, 5-Step Phase Gating workflow (`dispatch.json`, `iteration-state.json`) enforced physically via an MCP Server. It actively *runs* tasks, blocks execution (`mX_contract_review_pending`), and enforces a dual-track (Executor vs. Gatekeeper) verification cycle. It is stateful and highly prescriptive.
- **Structure:** Heavy. Contains an active meta-workflow (`tasks/`, `workflow/`), deep historical retrospectives (`retros/`), legacy Python validators (`scripts/`), and a newly built Node.js MCP server (`src/mcp-server/`).

### `labs-teamwork-spec` (Comparison Repo)
- **Goal:** Non-Intrusive, Native-First Schema Injection.
- **Philosophy:** "Zero cognitive load" and "Non-Intrusive". It acts primarily as a CLI generator (`bin/context-pack`, `bin/install`) that injects Markdown rules (`.cursorrules`, `CLAUDE.md`, `AGENTS.md`) into a project's *native* configuration system. It avoids inventing custom workflow state machines within its own repository.
- **Structure:** Lightweight. Structured like an NPM CLI package (`bin/`, `src/commands/`, `package.json`). Contains clear templates (`templates/`) and examples (`examples/sample-project/`), but importantly, it does *not* contain an active execution history (`tasks/`) polluting its own source tree.

## 2. Key Differences & Trade-offs

| Feature | `team-agents-cowork` | `labs-teamwork-spec` |
| :--- | :--- | :--- |
| **State Management** | **Stateful:** Uses `workflow/dispatch.json` to hard-block agents from proceeding without reviews. | **Stateless:** Relies on the IDE's native rules and human oversight; no physical `dispatch.json` gatekeeper. |
| **Enforcement Mechanism** | **Active (MCP Server):** The agent calls `get_dispatch_state` and `verify_execution_compliance` via stdio to validate its actions. | **Passive (CLI/Hooks):** The user runs `agent-laws init` to inject Markdown templates into their repo; Git hooks (`pre-commit`) might enforce some schema rules. |
| **Cognitive Load (Setup)** | **High:** Requires understanding the L0-L6 architecture, Phase Gating (M1-M5), and JSON contract schemas. | **Low:** Run `npx agent-laws init`, and the IDE is magically configured. |
| **Agent Autonomy** | **Constrained:** Agents are physically blocked by the MCP server if a contract isn't approved by a sub-agent. | **Guided:** Agents are given strong prompt instructions (e.g., `CLAUDE.md`), but can technically ignore them if they hallucinate. |
| **Repository Clutter** | **High:** The framework repo *is* the execution repo, filled with `tasks/v0.5-*` artifacts. | **Low:** Clean separation between the CLI tool's source code and the `sample-project/` it manages. |

## 3. What to Borrow from `labs-teamwork-spec`
- **Clean Tool/Target Separation:** `labs-teamwork-spec` elegantly separates its source code (`src/cli.js`, `bin/`) from the project it manages (`examples/sample-project/`). `team-agents-cowork` desperately needs to extract its `tasks/` and `workflow/` state into a `.agent-state/` folder or treat itself purely as a scaffolding CLI that generates these folders in a *target* repository.
- **CLI-First Distribution:** Packaging the setup as an NPM-style CLI (or single binary) that generates the `.cursorrules` and workflow folders makes onboarding drastically smoother than curling a bash script and copying directories.
- **Native-First Focus:** `labs-teamwork-spec` explicitly targets `.cursorrules`, `CLAUDE.md`, `AGENTS.md`, and `.github/copilot-instructions.md`. `team-agents-cowork` has `adapters/`, but they are less prominently positioned as the primary entry point compared to the heavy Phase Gating documentation.

## 4. What NOT to Migrate (Keep `team-agents-cowork`'s Strengths)
- **Do NOT abandon the MCP Server:** The active, programmatic verification (`verify_execution_compliance`, `get_execution_diff`) achieved in V0.5 of `team-agents-cowork` is mathematically superior to relying solely on prompt instructions (`CLAUDE.md`). `labs-teamwork-spec` lacks this hard physical barrier against Agentic Sycophancy.
- **Do NOT lose the Dual-Track Review:** The independent Gatekeeper (SubAgent-GPT-5.4) workflow is the crown jewel of `team-agents-cowork`. It prevents a single agent from hallucinating its own approval.

## 5. Conclusion
`team-agents-cowork` is a powerful, highly disciplined **Execution Engine** (Layer 2/3), while `labs-teamwork-spec` is an elegant, frictionless **Scaffolding Tool** (Layer 1). The ideal V0.6 architecture would combine them: adopting `labs-teamwork-spec`'s CLI distribution and clean repo structure, while injecting `team-agents-cowork`'s MCP Server and Phase Gating workflow into the target project to enforce the rules physically.
