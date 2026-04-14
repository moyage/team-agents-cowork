# Post-V0.5 Execution Splitting Plan

## 1. Goal
Translate the findings from the repository audit, consolidation plan, docs center blueprint, and comparative analysis into actionable, bounded execution tasks (Execution Contracts) suitable for Sub-Agent implementation.

## 2. Proposed Execution Splits
The work should be split sequentially to minimize risk and avoid blocking dependencies.

### Task 1: Global `.DS_Store` Purge
- **Objective:** Remove all `.DS_Store` files globally and ensure they are added to `.gitignore`.
- **Scope:** Find and delete `.DS_Store` files across all directories (`.`, `examples/`, `retros/`, `src/`, `tasks/`).
- **Affected Paths:** `**/.DS_Store`, `.gitignore`.
- **Risk Level:** Very Low.
- **Recommended Order:** 1

### Task 2: Historical Archive Consolidation
- **Objective:** Move historical point-in-time documents to a centralized `.archive/` directory to reduce root-level cognitive load.
- **Scope:** Create `.archive/`. Move `audit/`, `qa/`, `release/`, and `retros/` into it.
- **Affected Paths:** `audit/`, `qa/`, `release/`, `retros/`, `.archive/`. Update any immediate intra-directory markdown links if they exist and are trivial, but strictly limit to these 4 folders.
- **Risk Level:** Low (Broken markdown links in old retros are acceptable; no active workflow logic is touched).
- **Recommended Order:** 2

### Task 3: V0.4 and V0.5 Artifact Archival
- **Objective:** Move the execution artifacts (`tasks/v0.4-*` and `tasks/v0.5-*`) to `.archive/retros/v0.5-archive/` to clean the active workspace.
- **Scope:** Create `.archive/retros/v0.5-archive/`. Move all `tasks/*.json` and `tasks/*.md` related to past iterations.
- **Affected Paths:** `tasks/`, `.archive/retros/v0.5-archive/`.
- **Risk Level:** Medium. (Ensure `workflow/iteration-state.json` is either updated to point to the new paths or officially rotated/wiped for V0.6 so the framework isn't broken).
- **Recommended Order:** 3

### Task 4: Documentation Unification & Restructuring
- **Objective:** Implement the Docs Center Blueprint (`documentation/HUMAN_GUIDES/`, `documentation/AI_GUIDES/`, `documentation/SAMPLES/`).
- **Scope:** Move and consolidate `docs/ONBOARDING.md`, `docs/QUICKSTART.md`, and parts of `README.md` into the new structure. Move the actual rule files from `protocol/` into `documentation/HUMAN_GUIDES/ARCHITECTURE.md` or a dedicated `protocol/` sub-folder within `documentation/`.
- **Affected Paths:** `README.md`, `docs/`, `protocol/`, `documentation/`.
- **Risk Level:** Medium. (Requires careful rewriting of the root README to be a minimal entry point).
- **Recommended Order:** 4

### Task 5: Tooling Deprecation & Migration
- **Objective:** Move legacy Python validation scripts (`doctor.py`, `verify_protocol.py`) to a `legacy-tooling/` folder, as the TypeScript MCP Server (`src/mcp-server/`) is the new standard.
- **Scope:** Move `scripts/*.py` to `legacy-tooling/`. Update `setup.sh` or `Makefile` references if necessary.
- **Affected Paths:** `scripts/`, `legacy-tooling/`, `setup.sh`, `Makefile`.
- **Risk Level:** High. (Could break existing integration scripts or CI pipelines that rely on `doctor.py`).
- **Recommended Order:** 5

### Task 6: State & Framework Separation (The "labs-teamwork-spec" Integration)
- **Objective:** Structurally decouple the active execution state (`workflow/`, `tasks/`) from the framework templates and CLI tools, drawing inspiration from `labs-teamwork-spec`.
- **Scope:** Define a clear `target/` or `.agent-state/` folder pattern. Modify the bootstrap scripts (`install.sh`, `bin/agent-protocol-init`) to generate this state in the user's repository rather than assuming the framework's own repository is the target.
- **Affected Paths:** `workflow/`, `tasks/`, `install.sh`, `setup.sh`, `src/mcp-server/src/index.ts` (path resolution logic).
- **Risk Level:** Very High. (Requires altering the fundamental pathing logic of the MCP Server and the framework's distribution mechanism).
- **Recommended Order:** 6

## 3. Governance Notes
These tasks must *not* be executed as part of this study. They should be formally registered as the Backlog for Iteration V0.6, drafted into JSON execution contracts, and subjected to the standard Independent Reviewer Phase Gating protocol.
