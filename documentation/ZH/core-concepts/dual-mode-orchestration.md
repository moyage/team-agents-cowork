# 双态编排模式 (Dual-Mode Orchestration) 白皮书

## 背景与场景 (Background)
随着大语言模型及配套的 AI 编码工具集（如 Cursor, OpenCode）不断成熟，我们面临一个核心矛盾：
**如何平衡“开箱即用”与“极致可控”？**

有些日常开发任务（如写个单元测试、修复简单的 Bug），如果由 L2 (主脑) 自己从零开始拆解、调用命令行、写文件，会消耗海量 Token 且过程冗长。这类任务最适合交给像 `OpenCode` 这样自带测试驱动闭环 (TDD)、错误重试等高级技能集的黑盒工具。

但另一些高难度场景（如全局替换几百个文件的架构依赖，或需要通过特定安全检测后才能合并的分支），如果我们仍然把整个库扔给黑盒，它内部不可见的复杂流转和偶尔的“盲目自信（幻觉）”就会成为灾难。这时候我们需要绕过组合环境，直接用原生的高速模型（如 100 Tokens/s 的 `kimi-code`）进行手术刀式的精准打击。

这就是 **双态编排 (Dual-Mode Orchestration)** 诞生的背景。

## 功能定义 (Definition)
双态编排是指在 `team-agents-cowork` 的 YAML 工作流定义中，L2 Orchestrator 可以针对 DAG 中的每一个独立节点，动态指定其执行粒度与隔离级别：
- **`blackbox` (黑盒托管态)**
- **`orchestrated` (自由编排态)**

## 深度剖析与特性 (Features)

### A. 【AI Coding "黑盒"模式】 (`delegation_mode: blackbox`)
- **定位**: “外包”模式。L2 只定目标，L3 自己想办法。
- **适用场景**:
  - CRUD 功能开发。
  - 标准化重构或 Bug 修复。
  - 不需要跨文件大范围联动的独立模块实现。
- **工作机制**:
  - L2 只负责书写需求、约束条件以及最核心的 **验证探针 (Verify Command)**（例如 `npm run test`）。
  - L2 会通过单一的物理桥接入口（如 `opencode-bridge run ... --verify=...`）将这套参数整体下发。
  - 接单的 L3 执行器（如 OpenCode）内部自己决定使用什么 Agent（是 `sisyphus` 还是 `oracle`），自己决定切什么模型（免费层还是高级层），并在内部不断死循环试错，直到探针返回 `0` 才会将结果交还给 L2。
- **优势**: 极大降低了主脑的 Token 消耗，把脏活累活和上下文噪音全部挡在了黑盒里。

### B. 【自由编排模式】 (`delegation_mode: orchestrated`)
- **定位**: “微操”模式。L2 夺回控制权，直接调度底层裸算力。
- **适用场景**:
  - 极其复杂的系统架构审查（需要超长上下文读取）。
  - 极度危险的代码变更（不允许 AI 自行重试或绕过编译）。
  - 跨 IDE 混合协作（例如，第一步让 Cursor 由人写前端，第二步让 `kimi-code` 刷后端接口）。
- **工作机制**:
  - 打破黑盒。L2 在 YAML 中明确指定需要哪种特定能力（如 `capability_requirements: ["kimi-code-official"]`）。
  - L2 会直接调用原生的 CLI 代理（如执行 `kimi-code -p "分析架构..."`），甚至亲自派生一个没有任何外部工具挂载的 SubAgent。
  - 该模式下，如果启用了团队域，还会触发极度严苛的 MCP Git 沙箱物理隔离（防止它乱改当前目录）。
- **优势**: 绝对的安全边界。在面对诸如 `kimi-code` 这类能在一分钟内刷出数万行代码的高并发原生引擎时，确保它只执行 L2 指定的那一个动作。

## ⚙️ 使用范例 (Usage Example)

在一个自定义的 YAML DAG 契约中，你可以这样无缝混排这两种模式：

```yaml
nodes:
  # 节点 1：日常功能开发 -> 扔给黑盒 OpenCode，告诉它跑通单测即可。
  - id: write_feature
    type: ai_execution
    delegation_mode: blackbox
    task_spec:
      goal: "实现 UserAuth 模块"
      verify_command: "npm run test:auth"

  # 节点 2：核心安全审计 -> 必须剥夺黑盒权限，使用裸机算力 Kimi Code 进行大库级通读。
  - id: security_audit
    type: ai_execution
    delegation_mode: orchestrated
    capability_requirements: ["kimi-code-official"]
    depends_on: ["write_feature"]
    task_spec:
      goal: "审查刚才生成的 UserAuth 模块是否存在 SQL 注入风险"
```
