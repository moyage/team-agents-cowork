# 扩展指南：构建自定义适配器

**Team Agents Cowork** 的设计与环境无关。"可插拔适配器"层允许你将核心状态机连接到任何 AI 编码环境、CI/CD 管道或聊天界面。

本指南解释了如何构建自定义适配器。

## 理解适配器

适配器的主要责任是充当宿主环境 (例如：IDE 插件、Slack 机器人、CLI 工具) 与 `.agent-state/` JSON 产物之间的桥梁。

适配器 **不负责** 编写代码。它们负责：
1. 将用户意图转换为编排器能够理解的格式。
2. 读取 L2 和 L3 关卡的决策结果。
3. 将反馈中继回用户或宿主环境。

## 1. 初始化 Harness (线束)

您的自定义适配器首先必须能够初始化工作流。为此，它应该生成一个 `workflow/dispatch.json` 文件。

```json
{
  "workflow_id": "custom-wf-001",
  "status": "INITIALIZED",
  "intent": "用户的原始提示词放在这里",
  "source_adapter": "my-custom-adapter-v1.0"
}
```

## 2. 轮询 L2 关卡决策

一旦编排器生成了 `execution-contract.json`，您的适配器应该监控 `contract-review-decision.json` 的创建。

```typescript
// 轮询逻辑示例
async function waitForL2Approval(taskId: string) {
  while (true) {
    const decisionFile = readFileSync(`.agent-state/${taskId}-contract-review-decision.json`);
    if (decisionFile) {
      const decision = JSON.parse(decisionFile);
      if (decision.approved) return decision;
      else throw new Error(`契约被拒绝: ${decision.feedback}`);
    }
    await sleep(2000);
  }
}
```

## 3. 提交执行结果

在您的自定义 AI 智能体完成代码生成后，适配器必须汇总证据并将其提交到 L3 关卡。

写入 `execution-result.json`:

```json
{
  "task_id": "custom-wf-001",
  "files_modified": [
    "src/new_feature.py"
  ],
  "test_output": "1 passed, 0 failed",
  "execution_time_ms": 45000
}
```

## 4. 处理 L3 关卡拒绝

如果 L3 后关卡拒绝了该工作 (例如，因为智能体修改了被禁止的文件)，您的适配器必须解析 `result-review-decision.json` 并自动将错误反馈给宿主 AI，让其重新生成。

> **注意：** 成熟的适配器 (如官方 CLI) 会自主处理这种循环，防止用户需要手动告诉 AI 它哪里做错了。
