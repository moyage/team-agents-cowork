# Architecture

## L2 / L3 Layer Separation
- **L2 (Execution):** The active AI generating code. Susceptible to hallucination.
- **L3 (Governance):** The MCP server and Gatekeeper protocol. Immutable, physically isolated, and adversarial.

## State Abstraction
The system currently transitions from hosting its state internally (`tasks/`, `workflow/`) to extracting it into a `.agent-state/` folder inside the target user repository, establishing `team-agents-cowork` purely as a stateless NPM engine.
