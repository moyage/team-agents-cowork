# Cleanup & Consolidation Plan (Post-V0.5)

## 1. Recommendations for Archival (Consolidation)
The following directories contain historical evidence of past milestones. They should be collapsed into a single `.archive/` or `history/` top-level directory to reduce cognitive load and root-level clutter:
- `retros/` -> `.archive/retros/`
- `audit/` -> `.archive/audit/`
- `qa/` -> `.archive/qa/`
- `release/` -> `.archive/release/`

**Risk Level:** Low. These are read-only documents and moving them only breaks hardcoded historical markdown links, not executing scripts or workflow dispatch state.

## 2. Recommendations for Deletion (Purging)
- All `.DS_Store` files globally.
- The `tasks/v0.4-*` and `tasks/v0.5-*` JSON and markdown artifacts. 
  - *Note:* Since these are critical to V0.5's current state log (`workflow/iteration-state.json`), deleting them must only occur during an official "V0.6 Setup/Initialization" where state is officially rotated/wiped. They should be compressed into a `retros/v0.5-archive/` directory instead of raw deletion.

## 3. Recommendations for Merging / Renaming
- **Unifying Documentation:** Merge `docs/ONBOARDING.md`, `docs/QUICKSTART.md`, and the contents of `README.md`. A fragmented onboarding experience creates AI hallucination. The `docs/` folder should be renamed to `.docs/` or `documentation/` if it's framework-level, or integrated deeply with `protocol/`.
- **Unifying Tooling:** The `scripts/` directory containing Python validation tools (`doctor.py`, `verify_protocol.py`) overlaps with the new `src/mcp-server/`. 
  - *Action:* Move the Python scripts into a `legacy-tooling/` folder, or explicitly deprecate them in favor of the TypeScript MCP server.

## 4. Addressing State vs. Source Coupling
The largest structural flaw of `team-agents-cowork` is that it acts as both the *source code* of the framework and a *live execution project* using that framework. 
- *Action:* The `workflow/dispatch.json`, `workflow/iteration-state.json`, and the `tasks/` directory should be relocated to a `.agent-state/` or similar hidden execution directory, strictly separated from the framework templates.

## 5. Recommended Execution Order
1. Execute the `.DS_Store` global purge.
2. Execute the Archival Consolidation (`audit`, `qa`, `release`, `retros` -> `.archive/`).
3. Create the `v0.5-archive` directory and move all current `tasks/v0.5-*` artifacts into it.
4. Execute the Documentation Unification.
5. Execute the Tooling Deprecation (moving Python scripts to `legacy-tooling/`).
