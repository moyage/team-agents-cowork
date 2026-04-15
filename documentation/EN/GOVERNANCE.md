# Governance & Workflow

The heart of the framework is strict Phase Gating.

## Interrupted-Run Resumption Rule
If a circuit-breaker stops execution:
- You are ONLY authorized to recover the explicitly named step.
- You must NOT extrapolate "fix step X" into full autonomy resumption without explicit human re-approval.

## Self-Evolution Loop
The system can ingest error taxonomies from the JSON artifacts and propose self-repairs. However, these repairs MUST traverse the standard Pre-Gate and Post-Gate independent reviews to prevent silent self-modification.
