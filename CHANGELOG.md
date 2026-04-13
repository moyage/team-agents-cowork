# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-04-13
### Added
- **Adoption Kit**: New `QUICKSTART.md`, `ONBOARDING.md`, `TROUBLESHOOTING.md`.
- **Interactive Setup**: Fully functional `setup.sh` wizard and parameter-driven `sync_to_target.py`.
- **Safe Teardown**: `scripts/uninstall.sh` to safely rollback protocol injection without touching codebase.
- **Legacy Support**: `legacy-migration-guide.md` and `legacy.yaml` profile for brownfield projects.
### Changed
- **Documentation**: Rewrote `README.md` to shift from architecture specification to user-centric onboarding.
- **Terminology**: Globally purged "MTP" and "MTP V3" references, replacing them with "Team Agent Collaboration Protocol".
### Fixed
- **Templates**: Fixed bug in `sync_to_target.py` failing to copy `templates/` payload.

## [0.1.0] - 2026-04-13
### Added
- **Protocol Core**: Team Agent Collaboration Protocol minimum team protocol files (`01-collaboration-protocol.md`, `02-workflow.md`, `05-verification-standard.md`, `06-risk-approval-matrix.md`).
- **Templates**: Standardized Markdown templates for Tasks, Specs, Verification, and PRs.
- **Adapters**: IDE integration templates for general agents (`AGENTS.md.tpl`) and Cursor (`CURSOR_RULES.tpl`).
- **Scripts**: Diagnostic and verification probes (`doctor.py`, `verify_protocol.py`) to prevent AI hallucination.
- **Governance**: Initial checklists for CI, Audit, QA, and Release phases.\n