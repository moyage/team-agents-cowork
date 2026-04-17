# 双轨网关 (Dual-Track Gating)

Team Agents Cowork 框架的核心是 **双轨网关 (Dual-Track Gating)** 系统。作为 L3 编排层组件，它充当智能路由器，分析输入的目标并决定最适合的处理方式：是由单个高度自治的智能体（独立模式）处理，还是由确定性编排的智能体团队（团队模式）处理。

## 网关哲学

并非每个任务都需要团队。为一个简单的查询调用完整的 YAML DAG 会引入不必要的延迟和开销。相反，依赖单个智能体解决复杂的多步工程任务通常会导致上下文溢出或幻觉循环。

双轨网关系统平衡了这两个极端。

```mermaid
flowchart TD
    UserRequest[用户请求 / 目标] --> GatingEngine{双轨网关引擎}
    
    GatingEngine -- "高确定性\n严格护栏\n多步骤" --> TrackA[团队模式 (Team)]
    GatingEngine -- "探索性\n低开销\n单领域" --> TrackB[独立模式 (Solo)]
    
    subgraph 轨道 A: 编排路由
        TrackA --> Parser[YAML DAG 解析器]
        Parser --> L2NodeA[L2 智能体: 专家]
        Parser --> L2NodeB[L2 智能体: 审核员]
    end
    
    subgraph 轨道 B: 黑盒路由
        TrackB --> BlackboxAgent[L2 智能体: 全能]
        BlackboxAgent <--> Tools[Harness L4 工具]
    end
    
    L2NodeB --> Result[最终结果]
    BlackboxAgent --> Result
```

## 独立模式 (Solo Mode - 黑盒路由)

在 **独立模式** 下，目标完全移交给 L2 节点智能体。L3 编排器退居幕后，允许智能体自行决定解决路径。

### 特征
- **自治性**: 高。智能体动态决定调用哪些工具以及何时调用。
- **延迟**: 低开销。直接调用。
- **最适合**: 代码总结、单一 API 数据抓取、探索性查询。

### 驾驭工程集成 (L4)
即使在独立模式下，智能体也受限于 **驾驭工程 (Harness Engineering)**。它在严格定义的沙箱内运行，使用预定义的工具集和上下文窗口，防止其超出操作约束。

## 团队模式 (Team Mode - 编排路由)

在 **团队模式** 下，L3 编排器全面接管。目标映射到预定义或动态生成的 YAML DAG。编排器在多个 L2 节点智能体之间路由数据，确保严格遵循执行图。

### 特征
- **确定性**: 高。执行流程可预测且可见。
- **容错性**: 独立的节点执行。如果节点 A 失败，在重试机制触发前，节点 B 不受影响。
- **最适合**: 复杂的软件开发、多阶段数据管道、需要同行评审的综合研究。

### 跨层交互 (L2 <-> L3)
在团队模式执行期间，L2 智能体纯粹作为功能节点运行。L3 层处理状态持久化（通过 L1 协议），并将一个 L2 智能体的输出直接路由到下一个智能体的上下文窗口（L4 驾驭）。

## 配置

网关机制可以被静态强制指定，或者由 L6 战略模型动态确定。

```yaml
# L3 网关配置示例
router:
  mode: dynamic
  thresholds:
    complexity_score: 0.7
    requires_parallelism: true
  fallback: team
```