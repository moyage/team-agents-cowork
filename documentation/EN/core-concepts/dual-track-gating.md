# L2/L3 Dual-Track Gating

To prevent "Agentic Sycophancy" (where an AI hallucinates success and approves its own flawed code), we mathematically isolate the Executor from the Reviewer.

```mermaid
sequenceDiagram
    participant Executor as Executor (L2)
    participant State as .agent-state/
    participant Gatekeeper as Gatekeeper (L3)

    Executor->>State: Pushes execution-result.json
    State-->>Gatekeeper: Wakes up via Daemon
    Gatekeeper->>State: Analyzes Git Diff & Contract
    Gatekeeper-->>State: Writes decision.json (Approved/Rejected)
    State->>Executor: Unlocks Merge or Forces Retry
```

> **Warning:** The Gatekeeper is a dedicated, isolated sub-process. It CANNOT be bypassed by the Executor.
