# Team Collaboration

In Team Mode, the protocol acts as a strict synchronization mechanism.

## Capability Modeling
A dedicated Orchestrator Agent reads the Jira Epic and generates multiple bounded JSON contracts.
- The Orchestrator queries environment capabilities.
- Task A (Frontend UI) is assigned to a Trae/Cursor user.
- Task B (Long-running tests) is assigned to an OpenCode daemon.

## Conflict Resolution
Because every task has a strictly verified `allowed_files` boundary approved at the `Pre-Gate`, parallel execution is mathematically guaranteed not to result in overlapping physical file mutations.
