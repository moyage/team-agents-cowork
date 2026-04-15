# Team Collaboration & Dual-Tiered Sync

In a distributed team, syncing every AI trial-and-error loop to the `main` branch creates massive merge conflicts. We use a **Dual-Tiered Topology**:

1. **The Cloud Ledger (GitHub `agent-sync` branch):** The Orchestrator pushes `execution-contract.json` tasks here.
2. **The Pull Model:** Remote developers pull the `agent-sync` branch and "claim" contracts locally.
3. **The Local Bus:** All AI coding and Gatekeeper review loops happen *locally* in `.agent-state/`.
4. **The Final Push:** Only the Gatekeeper-approved code and artifacts are pushed as a clean PR to `main`.
