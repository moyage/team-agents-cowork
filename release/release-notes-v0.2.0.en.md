# V0.2.0 Release Notes

## 1. Version Positioning
V0.2.0 is a milestone release that transitions the Team Agent Collaboration Protocol from a strict "architecture specification repository" into a highly usable, low-friction toolchain product. This release focuses squarely on reducing adoption and onboarding friction, enabling individual developers and small teams to rapidly integrate anti-hallucination agent workflows via interactive scripts and non-destructive architecture.

## 2. What's New
- **Overhauled Documentation Base**: Completely rewrote the `README.md` as an end-user entry point. Added `QUICKSTART.md` (3-minute setup), `ONBOARDING.md`, and `TROUBLESHOOTING.md`.
- **Interactive Setup Kit**: Upgraded `setup.sh` to provide an interactive installation wizard. Bridged `install.sh` and `install.ps1`. Supports silent multi-parameter injection (`--target`, `--ide`, `--profile`).
- **Safe Rollback**: Added `scripts/uninstall.sh` for precise removal of protocol injection, eliminating the fear of "breaking existing projects."
- **Legacy Project Support**: Introduced the `legacy` profile and migration guide, allowing legacy codebases lacking automated tests to onboard with lower resistance.
- **Physical Template Synchronization**: Fixed underlying dispatch mechanisms to ensure all `templates/` (Task, PR, Spec, etc.) are correctly injected into target projects.

## 3. Why It Matters
This version drastically lowers the cognitive load required to enforce "anti-hallucination" constraints. Previously, asking a team to read dozens of pages of Markdown protocols was impractical. Now, a single command (`./setup.sh`) physically injects all underlying constraints (Cursorrules/Traerules) and team guidelines (AGENTS.md) into the target project. It serves as the perfect springboard for personal-domain pilots and small-team trials.

## 4. Validation Status
- ✅ **Passed Independent Acceptance**: All script logic and documentation descriptions have undergone strict consistency alignment.
- ✅ **Sandbox Verification**: Completed isolated injection and teardown rollback tests in a real-world environment.
- ✅ **Terminology Purged**: Standardized all terminology to prevent context collision.

## 5. Known Limitations
- **Lack of Auto-Sniffing**: The setup script cannot yet automatically infer whether the target project uses Cursor or Trae; manual intervention or CLI arguments are still required.
- **Rule Anti-Tampering Not Enabled**: Business developers can still manually edit `.cursorrules` after local installation. Anti-tampering gating is deferred to V0.3.

## 6. Deferred to V0.3
- Auto-sniffing for target IDE environments.
- GitHub Action rule anti-tampering validation based on file hash comparisons.
- Centralized remote distribution baselines (e.g., cURL to Bash).

## 7. Recommended Usage
This release achieves **Pilot-Ready** status. It is highly recommended for:
- Individual developers piloting it in side projects.
- Core teams of 1-2 members establishing synergistic workflows.

## 8. Upgrade or Start Path
- **New Onboarding**: Start with `README.md` and `QUICKSTART.md`, then execute `./setup.sh`.
- **Legacy Projects**: Read `legacy-migration-guide.md` and execute `./setup.sh --profile legacy`.
