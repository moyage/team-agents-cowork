# Release Note: Team Agent Collaboration Protocol Initial Baseline (v0.1.0)

**Date**: 2026-04-13

## 1. 概览 (Overview)
本次发布标志着 Team Agent Collaboration Protocol (Team Agent Collaboration Protocol) 核心工程库的首次正式就绪。本库作为“规范的规范（Canonical Source）”，旨在收敛多 Agent (Hermes, Opencode, Cursor 等) 协作时的上下文漂移、越权风险和幻觉问题。

## 2. 核心特性 (Highlights)
- **Schema-First 机制**: 抛弃长文本 Prompt 依赖，确立 5-Step 标准作业流 (Clarify -> Spec -> Plan -> Build -> Verify)。
- **物理防幻觉探针 (PoW)**: 内置 `doctor.py` 和 `verify_protocol.py`，强制 Agent 提交 Exit Code 0 证明。
- **自举式治理**: 本仓库自身架构、变更与验收均接受 Team Agent Collaboration Protocol 治理。

## 3. 适用范围 (Applicability)
适用于所有新接入 Curvature Labs 的 Agent 辅助工程项目，提供基础的 `.cursorrules` 与 `AGENTS.md` 注入。

## 4. 已知限制 (Known Limitations & Findings)
- `F-001`: 当前缺少独立业务代码 Sample Project 演示跨库同步能力。
- `F-002`: Trae 与 Claude-Code 特化适配器尚未在此版本中提供。\n