# Team Collaboration & Dual-Tiered Sync

In a remote team, multiple agents (Cursor, Opencode) running simultaneously would corrupt the standard Git tree. We resolve this using the **Dual-Tiered Topology**.

## Step-by-Step Collaboration Workflow

**1. The Cloud Ledger (Pulling Work)**
The team's Orchestrator places task contracts on the remote `agent-sync` branch.
```bash
git fetch origin agent-sync
git checkout agent-sync
```

**2. The Pull Model (Claiming the Task)**
Your local AI reads `.agent-state/tasks/contract.json`. It updates the `executor` field to its own ID:
```json
{
  "executor": "alice-cursor",
  "status": "InProgress"
}
```

**3. Local Execution**
Your local AI attempts to fulfill the contract. It writes code and runs tests. All failure logs and retries remain locked in your local `.agent-state/` directory.

**4. The L3 Gatekeeper Review**
Once the code passes local checks, the Gatekeeper runs:
```bash
team-agents-cowork review
```
If the output is `Approved`, the Gatekeeper generates a `decision.json`.

**5. The Final Push**
You merge your clean code and the Approved `decision.json` back to the main branch via PR.
```bash
git checkout main
git merge agent-sync
git push origin main
```
