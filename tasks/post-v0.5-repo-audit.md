# Post-V0.5 Repository Audit Report

## 1. Directory Tree Overview & Responsibilities
The `team-agents-cowork` repository currently contains:
- `adapters/`: Templates for IDE-specific agent rules (`.cursorrules`, `CLAUDE_CODE_RULES`, etc.).
- `audit/`: Markdown reports for protocol consistency, risk registers, and checklists.
- `ci/`: GitHub Action templates and integrity manifests.
- `docs/`: User-facing documentation (Quickstart, Onboarding, Anti-tamper CI).
- `examples/`: Sample integrations (e.g., `minimal-integration/`).
- `profiles/`: YAML config profiles (`default.yaml`, `strict.yaml`).
- `protocol/`: The canonical L0-L6 architecture rules (01 through 08 markdown files).
- `qa/`: Acceptance reports and test checklists.
- `release/`: Release notes, checklists, and upgrade guides.
- `retros/`: Historical iteration summaries and delivery audit reports (v0.2, v0.3, v0.4 archives).
- `schemas/`: JSON schemas defining the data structures for workflow contracts and results.
- `scripts/`: Python/Bash utility scripts (`doctor.py`, `verify_protocol.py`, `sync_to_target.py`).
- `src/mcp-server/`: The V0.5 implementation of the programmatic Context API.
- `tasks/`: The active L2/L3 execution meta-workflow directory containing all JSON contracts, review decisions, and packet files for the current iteration (V0.4 and V0.5).
- `templates/`: Markdown templates for PRs, Specs, Problem Reports, etc.
- `workflow/`: The Canonical Source-of-Truth state files (`dispatch.json`, `iteration-state.json`).

## 2. File & Directory Categorization
### Core / Active Logic
- `workflow/` (State Machine)
- `src/mcp-server/` (Protocol Enforcer API)
- `schemas/` (Data Validation)
- `protocol/` (The actual human-readable rules)
- `scripts/` (Tooling)

### Meta-Workflow / Temporal Artifacts
- `tasks/` (Highly bloated with iteration-specific execution results and contracts)

### Historical / Archival
- `retros/` (Previous iteration records)
- `audit/`, `qa/`, `release/` (Point-in-time documents)

## 3. Temporary & Bloat Material Identification
- **`tasks/` directory bloat:** Contains 48+ files specifically from V0.4 and V0.5 runs (e.g., `v0.5-m3-execution-contract.json`). These are runtime artifacts that clutter the root namespace of the active workflow. They should be archived per-iteration.
- **`.DS_Store` files:** Found in `./`, `examples/`, `retros/`, `src/`, `tasks/`. Should be globally gitignored and purged.
- **Redundant Archives:** `retros/v0.3-archive` and `retros/v0.4-archive` contain deeply nested implementation reports which might be better suited for a dedicated `.archive/` or GitHub Wiki/Releases page rather than bloating the main tree.

## 4. Overlapping Responsibilities & Confusion Points
- **`scripts/verify_protocol.py` vs. `src/mcp-server/`**: The Python scripts were the V0.3/V0.4 way of validating protocols. V0.5 introduced the `mcp-server` for native programmatic validation. Having both active causes cognitive split for integrating agents.
- **`docs/` vs. `protocol/` vs. `README.md`**: `README.md` attempts to do onboarding, while `docs/ONBOARDING.md` exists. `protocol/` contains the actual rules, but `docs/` contains explanations. This creates a fragmented reading path for humans and AI.
- **`audit/`, `qa/`, and `retros/`**: All three directories effectively serve as "past execution records" but are split top-level. 

## 5. Identified Risk Points
- **Root Level Clutter:** 15 top-level directories make the repository overwhelming for an AI agent's initial context window.
- **State vs. Source Coupling:** The `tasks/` and `workflow/` directories mix active repository state with the actual framework source code. If someone clones this repo to *use* it, they inherit our V0.5 execution history.
