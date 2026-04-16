# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.0] - $(date +%Y-%m-%d)
### Added
- **Built-in Workflows**: Incorporated 17 built-in YAML DAG workflows (`idea-to-pr`, `assist`, `fix-github-issue`, etc.) natively into the engine.
- **Dual-Tiered Sync Topology**: Formalized remote team collaboration via `.agent-state` isolation and `agent-sync` branch pulling.
- **Documentation Portal**: Deployed GitBook-style bilingual (EN/ZH) documentation center in `documentation/`.
- **Dynamic Extensibility**: Added support for users to define and hot-load custom workflow overrides in `.agent-state/workflows/*.yaml`.
### Changed
- **Schema Enforcement**: Hardened documentation by directly injecting JSON Schema definitions (e.g., `execution-contract.schema.json`) as exact engineering baselines.
- **Core Orchestration**: Solidified the "Triumvirate" architecture (Intent Contract + YAML DAG + Gatekeeper Isolation).

## [0.7.0] - 2026-04-15
### Added
- **MCP Server Core**: Scaffolded foundational Model Context Protocol server.
- **Execution Sandboxing**: Added isolated local states for unverified code.

## [0.6.0] - 2026-04-15
### Added
- **LLM Router MVP**: Early implementation of intent-based routing to YAML graphs.

## [0.5.0] - 2026-04-14
### Changed
- **DAG Engine Draft**: Prototyped `.yaml` dependency graph orchestrator replacing hardcoded sequential pipelines.

## [0.4.0] - 2026-04-14
### Added
- **L2/L3 Isolation Mechanics**: Built the physical separation layer preventing Executor self-approval.
## [0.8.0] - $(date +%Y-%m-%d)
### Added
- **Built-in Workflows**: Incorporated 17 built-in YAML DAG workflows (`idea-to-pr`, `assist`, `fix-github-issue`, etc.) natively into the engine.
- **Dual-Tiered Sync Topology**: Formalized remote team collaboration via `.agent-state` isolation and `agent-sync` branch pulling.
- **Documentation Portal**: Deployed GitBook-style bilingual (EN/ZH) documentation center in `documentation/`.
- **Dynamic Extensibility**: Added support for users to define and hot-load custom workflow overrides in `.agent-state/workflows/*.yaml`.
### Changed
- **Schema Enforcement**: Hardened documentation by directly injecting JSON Schema definitions (e.g., `execution-contract.schema.json`) as exact engineering baselines.
- **Core Orchestration**: Solidified the "Triumvirate" architecture (Intent Contract + YAML DAG + Gatekeeper Isolation).

## [0.7.0] - 2026-04-15
### Added
- **MCP Server Core**: Scaffolded foundational Model Context Protocol server.
- **Execution Sandboxing**: Added isolated local states for unverified code.

## [0.6.0] - 2026-04-15
### Added
- **LLM Router MVP**: Early implementation of intent-based routing to YAML graphs.

## [0.5.0] - 2026-04-14
### Changed
- **DAG Engine Draft**: Prototyped `.yaml` dependency graph orchestrator replacing hardcoded sequential pipelines.

## [0.4.0] - 2026-04-14
### Added
- **L2/L3 Isolation Mechanics**: Built the physical separation layer preventing Executor self-approval.
## [0.2.0] - 2026-04-13
### Added
- **Adoption Kit**: New `QUICKSTART.md`, `ONBOARDING.md`, `TROUBLESHOOTING.md`.
- **Interactive Setup**: Fully functional `setup.sh` wizard and parameter-driven `sync_to_target.py`.
- **Safe Teardown**: `scripts/uninstall.sh` to safely rollback protocol injection without touching codebase.
- **Legacy Support**: `legacy-migration-guide.md` and `legacy.yaml` profile for brownfield projects.
### Changed
- **Documentation**: Rewrote `README.md` to shift from architecture specification to user-centric onboarding.
- **Terminology**: Globally standardized terminology to exclusively use "Team Agent Collaboration Protocol".
### Fixed
- **Templates**: Fixed bug in `sync_to_target.py` failing to copy `templates/` payload.

## [0.1.0] - 2026-04-13
### Added
- **Protocol Core**: Team Agent Collaboration Protocol minimum team protocol files (`01-collaboration-protocol.md`, `02-workflow.md`, `05-verification-standard.md`, `06-risk-approval-matrix.md`).
- **Templates**: Standardized Markdown templates for Tasks, Specs, Verification, and PRs.
- **Adapters**: IDE integration templates for general agents (`AGENTS.md.tpl`) and Cursor (`CURSOR_RULES.tpl`).
- **Scripts**: Diagnostic and verification probes (`doctor.py`, `verify_protocol.py`) to prevent AI hallucination.
- **Governance**: Initial checklists for CI, Audit, QA, and Release phases.\n
