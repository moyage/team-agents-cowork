# 🏛 老项目迁移指南 (Legacy Migration)

老项目（技术债多、测试缺失）强行套用 Strict 的 5 步工作流会导致严重的反弹。

## 解决方案：Legacy Profile
我们提供了 `profiles/legacy.yaml`。当以此模式接入时：
1. **免除前置 Spec 强校验**：允许 Agent 直接阅读代码并进行修复。
2. **弱化 Exit Code 0 约束**：由于老项目可能没有自动化测试，允许 Agent 采用“日志比对”或“依赖人类手动回归”作为工作证明。
3. **隔离 Blast Radius**：仅允许 Agent 在指定的作用域（如单一文件或模块）内操作，禁止触碰 `package.json` 或全局架构。

## 如何启用？
`./setup.sh --target ../my-legacy-app --ide cursor --profile legacy`
