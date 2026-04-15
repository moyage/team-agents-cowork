# The Conceptual Triumvirate

Drawing inspiration from mature open-source workflows (like Archon), `team-agents-cowork` operates on three foundational pillars:

1. **The Intent (Contract):** An `execution-contract.json` that mathematically bounds what an AI is allowed to do.
2. **The Flow (YAML DAG):** A `.yaml` file orchestrating the dependencies between AI tasks and Bash commands.
3. **The Governance (Isolation):** Strict physical separation of the *Executor* (writing the code) from the *Gatekeeper* (reviewing the code).
