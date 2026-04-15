# Documentation Center Blueprint

## 1. Overview
The current documentation is fragmented across `README.md`, `docs/`, `protocol/`, `retros/`, and `examples/`. A centralized, unified structure is required to serve both Human Team Members and AI Integration Environments.

## 2. Target Audiences & Needs
### Human Team Members
- **Needs:** High-level understanding of the architecture, workflow gating, risk approval matrix, and how to collaborate with AI agents.
- **Pain Point:** 15 top-level directories make it hard to know where to start.

### AI Integration Environments (e.g., Claude Code, Cursor, OpenCode)
- **Needs:** Strict, unambiguous rules (`adapters/`), clear data schemas (`schemas/`), and programmatic endpoints (`src/mcp-server/`).
- **Pain Point:** Mixing legacy Python scripts (`verify_protocol.py`) with native MCP servers causes hallucination over which tool to use. The current V0.5 JSON artifacts cluttering `tasks/` may confuse an AI into thinking it must append to V0.5 rather than starting V0.6.

## 3. Proposed Structure (Docs Center)
The `.docs/` or `documentation/` directory should be organized categorically:

```text
documentation/
├── HUMAN_GUIDES/
│   ├── QUICKSTART.md (How to deploy the MCP server and run your first agent)
│   ├── ARCHITECTURE.md (The L0-L6 conceptual framework)
│   ├── GOVERNANCE.md (The Phase Gating Rules, Risk Matrices)
│   └── FAQ_TROUBLESHOOTING.md
├── AI_GUIDES/
│   ├── SYSTEM_PROMPT.md (The canonical instructions to feed into an agent's context)
│   ├── MCP_API_REFERENCE.md (How to call get_dispatch_state and get_execution_diff)
│   └── SCHEMA_REFERENCE.md (How to format execution-contracts and results)
└── SAMPLES/
    ├── v0.5-example-workflow.md (A walkthrough of a completed M1-M5 iteration)
    └── minimal-integration/ (Existing example folder)
```

## 4. Key Actions & Shifts
- **README.md Simplification:** The root `README.md` must be ruthlessly trimmed. It should only contain the project name, the core philosophy, an installation one-liner, and links directly to `documentation/HUMAN_GUIDES/QUICKSTART.md`. All onboarding and technical details must be pushed down into the docs center.
- **Canonical Source Clarification:** The actual protocol rules (currently in `protocol/01-*.md` through `08-*.md`) should either remain a top-level `protocol/` directory if they are the "law code", or be merged into `documentation/HUMAN_GUIDES/ARCHITECTURE.md`.
- **Sample/Demo Demarcation:** The current V0.5 artifacts inside `tasks/` and `retros/` are excellent examples of the protocol in action. They should be copied or moved into `documentation/SAMPLES/` so that future agents can read them as reference material without confusing them for active workflow state.
