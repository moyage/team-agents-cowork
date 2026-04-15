# Core Concepts & Overview

**Team Agents Cowork** is a protocol-first collaboration system. It elevates your repository into a zero-trust, multi-agent workspace by forcing heterogeneous AI coding tools (Cursor, OpenCode, Trae) to synchronize through a mathematical, file-based state machine.

## What Problem Does It Solve?
Modern development relies heavily on AI coding environments. However:
1. **Agentic Sycophancy:** AI tools blindly agree with themselves and hallucinate success.
2. **State Collision:** Multiple AI agents operating simultaneously overwrite each other's work.
3. **Cognitive Load:** Reviewing endless chat histories is unsustainable for human developers.

## The Solution
We enforce a **5-Artifact Taxonomy**:
1. `workflow/dispatch.json` (State Harness)
2. `*-execution-contract.json` (Intent)
3. `*-contract-review-decision.json` (Pre-Gate Approval)
4. `*-execution-result.json` (Evidence)
5. `*-result-review-decision.json` (Post-Gate Approval)

By isolating the **Executor** from the **Gatekeeper**, we mathematically guarantee that AI code conforms exactly to its approved boundaries.
