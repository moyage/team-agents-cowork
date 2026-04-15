# 使用指南

## 个人模式

在个人模式下，您充当 **协调者 (Coordinator)**，而您的 IDE (如 Cursor) 则是 **执行者 (Executor)**。该框架可确保您的 AI 保持专注并严格验证其自身的输出。

### 分步示例

1. **Harness 初始化**
   要求编排器启动一项新任务。
   ```bash
   npx team-agents-cowork init "构建用户身份验证模块"
   ```

2. **起草契约**
   编排器 AI 起草 `execution-contract.json`。
   ```json
   {
     "task_id": "auth-module-01",
     "description": "实现基于 JWT 的身份验证",
     "allowed_files": [
       "src/auth/auth.service.ts",
       "src/auth/auth.controller.ts"
     ],
     "acceptance_criteria": [
       "必须通过 npm run test:auth",
       "不得修改 src/users/ 核心实体"
     ]
   }
   ```

3. **L2 预关卡审批**
   手动或自动调用隔离的子智能体来审查该契约。
   ```bash
   npx team-agents-cowork review-contract auth-module-01
   ```

4. **执行**
   指示您 IDE 的 AI (如 Cursor Composer) *严格*基于 `.agent-state/auth-module-01-execution-contract.json` 实现功能。

5. **L3 后关卡验证**
   隔离的子智能体会根据契约验证 git diff。
   ```bash
   npx team-agents-cowork verify-result auth-module-01
   ```

## 命令参考

* `npm run mcp` - 启动 MCP 服务器，暴露 `get_dispatch_state` 和 `verify_execution_compliance`。
* `npx team-agents-cowork init <prompt>` - 引导创建 `.agent-state` 目录并生成 `dispatch.json`。
* `npx team-agents-cowork review-contract <task-id>` - 评估提议的契约以避免状态冲突。
* `npx team-agents-cowork verify-result <task-id>` - 运行差异分析和评估基准以生成 `result-review-decision.json`。

> **警告：** 请勿手动修改 `.agent-state/` 中的 JSON 产物。请始终使用 CLI 命令来安全地转换状态。
