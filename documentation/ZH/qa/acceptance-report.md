# QA Acceptance Report: V0.8.7

## Scope
- Dual-Mode Orchestration integration (Blackbox vs Orchestrated).
- CLI Architecture Refactor in `bin/agent-protocol-review` and `bin/agent-protocol-init`.
- MCP Server Security Patching (`src/mcp-server/src/index.ts`).
- Documentation Overhaul (Bilingual parity, L0-L6 alignment).

## Test Environments
- macOS M2 (Node.js v20.12.1, TypeScript 5.4.5)
- Fresh directory initialization via `/tmp` cloning.

## Executed Cases
1. **Repository Initialization**:
   - `bin/agent-protocol-init` successfully scaffolds `.agent-state/` without hardcoding specific cloud AI vendor names. (PASS)
2. **MCP Security**:
   - Tested task execution endpoints containing maliciously crafted `baseline_commit` parameters. The new `execFile` implementation blocks injection vectors. (PASS)
3. **Dual-Mode CLI Dispatch**:
   - `bin/agent-protocol-review` verified to launch `opencode-bridge run` in blackbox mode, and capable of delegating to a dynamic registry executor (e.g., `kimi-code`) when orchestrated. (PASS)
4. **Compilation**:
   - `cd src/mcp-server && npm install && npm run build` produced a valid `build/index.js` containing `delegation_mode` detection logic without TS errors. (PASS)
5. **Documentation Link Checking**:
   - All internal markdown references and `mermaid` tags parsed correctly without broken relative links. (PASS)

## Conclusion
Iteration V0.8.7 meets all acceptance criteria and resolves critical technical debt identified in V0.8.6. It is ready for public release.
