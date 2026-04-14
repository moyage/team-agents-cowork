# Governance & Risk Matrix

## 1. Overview
Team Agents Cowork uses a Phase-Gating protocol, meaning an agent cannot freely transition between planning, execution, and closure without formal, physical sign-offs (`Approved` decisions in JSON artifacts).

## 2. The Contract Model
Before an agent writes any source code, it must draft an Execution Contract (`tasks/*-execution-contract.json`). This contract specifies:
- `allowed_files`: The strict subset of files the agent is allowed to touch.
- `allowed_artifacts`: The metadata files that will track its progress.

## 3. Sub-Agent Gating
A separate LLM process (the Reviewer) audits the contract before execution, and the git diff after execution. If the Reviewer rejects the action, the workflow state (`dispatch.json`) pauses until a human or the executor corrects the deviation.
