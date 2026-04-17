# 个人域/团队域 (Solo/Team) 工作区切换白皮书

## 背景与场景 (Background)
如果你是一位经验丰富的开发者，你或许曾体会过这样的崩溃：
> “我的 Agent 正在分析项目结构，试图改写几百个 TypeScript 文件的导出路径。同时，我正在 Cursor 里看另一个模块的定义。突然，底层的 Agent 直接把文件覆盖了，不仅让我的 IDE 报错死锁，还在后台触发了构建脚本的一堆警告。更可怕的是，这还没完，另一个后台 Agent 突然冒出来尝试执行 `git checkout`……”

这就是所谓的 **“并发灾难 (Fake Concurrency)”**。多智能体协作框架如果不引入极严苛的物理隔离，就只能让 AI 排排坐单线程作业。

但另一方面，如果我们只是周末自己在家里做个全栈项目，任何任务都在云端拉一个新容器，再拉分支推代码，就会变成 **“过度工程 (Over-engineering)”**。

因此，**“工作区模式切换 (Workspace Modes)”** 旨在让你本地的开发效率（个人域）与大规模协作时的零容忍隔离（团队域）之间达成完美的动态平衡。

## 功能定义 (Definition)
工作区模式是 `team-agents-cowork` 在运行时级别定义的一种沙箱形态开关：
- **`--mode=solo` (个人域)**
- **`--mode=team` (团队域)**

通过修改全局配置文件（或 CLI 传参），主脑 L2 会自动判断在遇到复杂的 `orchestrated` 并发任务时，应该采用怎样的物理路径欺骗与同步策略。

## 深度剖析与特性 (Features)

### A. 【个人域】 (`--mode=solo`)
- **定位**: “同态共生”模式。所有 Agent 都在当前的实际物理路径中写代码。
- **适用场景**:
  - 本机单人极速迭代。
  - 需要在 Cursor 等 IDE 侧一边看 Agent 写，一边自己补充。
  - 使用了自带并发控制或文件锁的黑盒组合工具（如 OpenCode）。
- **工作机制**:
  - L2 调度层接收到任务契约时，直接将当前的 `projectRoot` 作为活动工作区传给所有 L3 执行引擎。
  - 依赖本地操作系统的文件读写锁与 Git 的原生 `index.lock` 来阻止小概率的冲撞。
- **优势**: 零启动耗时，所见即所得。所有的改动立刻反映在你当前的编辑器中。

### B. 【团队域】 (`--mode=team`)
- **定位**: “零信任隔离”模式。
- **适用场景**:
  - 处理远程团队分配的 `dispatch.json` 流水线任务。
  - 具有安全审计、代码评审、极易引发冲突的底层重构（如改写 Webpack/Vite 配置）。
  - 需要派发多个专职的子智能体在同一个仓库里同时执行互斥的操作（例如一个改前端组件，一个改后端 Schema）。
- **工作机制 (MCP Headless Worktree)**:
  - L2 在遇到属于 `orchestrated` 的并发节点时，会拦截原本直接指向 `projectRoot` 的系统调用。
  - 主脑会为这个特定任务动态触发 `git worktree add`，在代码库外面（如 `../.cowork-sandboxes/<task-id>`）**凭空克隆出一个完全隐藏的无头沙箱分支**。
  - 所有的 L3 引擎（无论是 `kimi-code` 还是 `subagent`）通过 MCP Context API 被骗入这个无头沙箱中执行文件读写、跑测试脚本甚至 Commit。
  - 当沙箱内的所有测试探针变绿后，L2 才会将该沙箱的 diff 以标准 PR/Merge 形式收拢回主线。
- **优势**: 绝对防冲突。哪怕 10 个 Agent 同时在底层发狂写代码，你当前的 Cursor 窗口也岁月静好，因为物理上它们根本不在操作你的当前目录。

## ⚙️ 使用范例 (Usage Example)

### 全局配置 (manifest.yaml)
你可以在团队的根配置中强制定义一个项目的基准安全红线：

```yaml
# manifest.yaml
version: 0.8.9
workspace:
  mode: "team"
  isolation_provider: "git-worktree" # 使用 MCP Headless Worktrees
```

### CLI 动态覆写
开发者在本地可以随时利用命令行覆盖全局约束：

```bash
# 场景 1: 我只打算在本地快速跑一个修 Typo 的流程，不需要拉无头沙箱
team-agents-cowork run fix-typo.yaml --mode=solo

# 场景 2: 团队扔给我一个史诗级重构任务（几百个文件的迁移），我必须开启沙箱防冲撞
team-agents-cowork run epic-refactor.yaml --mode=team
```

### 运行时感知 (MCP API)
执行引擎在底层调用的所有 `cowork_write_file` 动作，已经自动在内部封装了这套隔离逻辑：
```typescript
// 内部引擎机制伪代码
if (delegationMode === "orchestrated" && workspaceMode === "team") {
  // L3 以为自己在项目根目录，其实已经被重定向到无头沙箱
  activeTaskWorktreePath = await createWorktree(projectRoot, args.task_id);
} else {
  // Solo 模式下裸并发，使用当前真实根目录
  activeTaskWorktreePath = projectRoot;
}
```
