# Team-Agents 内置工作流指南 (Built-in Workflows Guide)

本指南详细介绍了 Team-Agents 提供的 18 个内置工作流模板 (`templates/workflows/*.yaml`)。这些工作流被逻辑地分组为五大类别，涵盖了从构思、开发、测试、审查到部署的软件开发全生命周期。

---

## 目录

1. [功能开发与架构 (Feature Development & Architecture)](#1-功能开发与架构-feature-development--architecture)
2. [代码重构与维护 (Code Refactoring & Maintenance)](#2-代码重构与维护-code-refactoring--maintenance)
3. [代码审查与拉取请求 (Code Review & Pull Requests)](#3-代码审查与拉取请求-code-review--pull-requests)
4. [问题追踪与修复 (Issue Tracking & Resolution)](#4-问题追踪与修复-issue-tracking--resolution)
5. [通用助手与特定任务 (General Assistant & Specific Tasks)](#5-通用助手与特定任务-general-assistant--specific-tasks)

---

## 1. 功能开发与架构 (Feature Development & Architecture)

### 1.1 `idea-to-pr`
- **适用场景 (Use Cases)**: 从一个宽泛的想法开始，从零进行规划、实现并最终生成带有审查的拉取请求。
- **触发条件 (Trigger Conditions)**: 用户提出了新功能的初步构想或基本想法。
- **选择策略 (Selection Strategy)**: 适用于完整的端到端新功能开发。如果已有详细计划，请使用 `plan-to-pr`。
- **流程图**:
  ```mermaid
  graph TD
    draft_plan["draft_plan (ai_execution)"]
    implement_feature["implement_feature (ai_execution)"]
    validate_feature["validate_feature (bash)"]
    multi_agent_review["multi_agent_review (ai_execution)"]

    draft_plan --> implement_feature
    implement_feature --> validate_feature
    validate_feature --> multi_agent_review
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run idea-to-pr --prompt "实现一个支持 OAuth2 的用户登录模块"`

### 1.2 `plan-to-pr`
- **适用场景 (Use Cases)**: 根据已有的详细开发计划或 `SPEC_TEMPLATE.md` 执行代码实现并生成 PR。
- **触发条件 (Trigger Conditions)**: 用户提供了一份详细的架构或需求规范文档。
- **选择策略 (Selection Strategy)**: 对比 `idea-to-pr`，跳过了 AI 规划阶段，直接基于现有方案进入代码实现。
- **流程图**:
  ```mermaid
  graph TD
    implement_plan["implement_plan (ai_execution)"]
    validate_implementation["validate_implementation (bash)"]
    review_implementation["review_implementation (ai_execution)"]

    implement_plan --> validate_implementation
    validate_implementation --> review_implementation
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run plan-to-pr --prompt "根据 docs/api-spec.md 实现用户管理接口"`

### 1.3 `feature-development`
- **适用场景 (Use Cases)**: 实现特定的、定义明确的功能，然后验证其正确性。
- **触发条件 (Trigger Conditions)**: 用户要求实现一个具体的、边界清晰的单一功能点。
- **选择策略 (Selection Strategy)**: 轻量级实现流程，剥离了繁重的多轮审查机制，追求快速构建和验证。
- **流程图**:
  ```mermaid
  graph TD
    build_feature["build_feature (ai_execution)"]
    validate_feature["validate_feature (bash)"]

    build_feature --> validate_feature
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run feature-development --prompt "为数据表格组件添加分页控制功能"`

### 1.4 `ralph-dag`
- **适用场景 (Use Cases)**: 围绕产品需求文档（PRD）进行批处理开发，逐个解析并实现所有用户故事（User Stories）。
- **触发条件 (Trigger Conditions)**: 需要落地一整份包含多个子任务/故事点的 PRD 文档。
- **选择策略 (Selection Strategy)**: 专用于将长篇文档拆解为迭代任务进行流水线开发的场景。
- **流程图**:
  ```mermaid
  graph TD
    parse_prd["parse_prd (ai_execution)"]
    implement_stories["implement_stories (ai_execution)"]

    parse_prd --> implement_stories
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run ralph-dag --prompt "解析并实现 docs/v2-prd.md 中的所有故事"`

### 1.5 `architect`
- **适用场景 (Use Cases)**: 对代码库进行高层级的架构审查，降低复杂度，提升整体代码健康度。
- **触发条件 (Trigger Conditions)**: 用户希望清理技术债务、重构老旧模块或优化整体架构。
- **选择策略 (Selection Strategy)**: 侧重于宏观视角的代码分析和重构建议（大扫除），而非具体的局部功能增加。
- **流程图**:
  ```mermaid
  graph TD
    sweep_architecture["sweep_architecture (ai_execution)"]
    propose_refactors["propose_refactors (ai_execution)"]

    sweep_architecture --> propose_refactors
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run architect --prompt "检查并优化 src/services 目录的依赖注入架构"`

### 1.6 `piv-loop`
- **适用场景 (Use Cases)**: 执行引导式的“计划-实现-验证”迭代循环，允许人工在迭代之间进行审查。
- **触发条件 (Trigger Conditions)**: 需要进行高度受控、可能需要人工随时干预（Human-in-the-loop）的复杂开发。
- **选择策略 (Selection Strategy)**: 当任务极具挑战性、风险较高，必须确保每一步计划和实现都经过确认时使用。
- **流程图**:
  ```mermaid
  graph TD
    plan_phase["plan_phase (ai_execution)"]
    implement_phase["implement_phase (ai_execution)"]
    validate_phase["validate_phase (bash)"]

    plan_phase --> implement_phase
    implement_phase --> validate_phase
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run piv-loop --prompt "逐步重构旧版订单处理系统的核心状态机"`

---

## 2. 代码重构与维护 (Code Refactoring & Maintenance)

### 2.1 `refactor-safely`
- **适用场景 (Use Cases)**: 在不改变代码外部行为特性的前提下，安全地执行代码重构。
- **触发条件 (Trigger Conditions)**: 用户要求优化特定模块或文件的内部结构、性能或可读性。
- **选择策略 (Selection Strategy)**: 非常保守且安全的重构流，强制包含类型检查和单元测试以防止引入回归（Regression）问题。
- **流程图**:
  ```mermaid
  graph TD
    apply_refactor["apply_refactor (ai_execution)"]
    verify_types["verify_types (bash)"]
    verify_tests["verify_tests (bash)"]

    apply_refactor --> verify_types
    verify_types --> verify_tests
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run refactor-safely --prompt "将 src/components 下的类组件重构为函数式组件"`

### 2.2 `resolve-conflicts`
- **适用场景 (Use Cases)**: 在 Git 合并或变基（Rebase）期间检测并解决代码冲突。
- **触发条件 (Trigger Conditions)**: 仓库处于 Git 冲突状态（Merge Conflict）。
- **选择策略 (Selection Strategy)**: 专用的冲突解决工具，能智能分析冲突双方的上下文并给出融合方案。
- **流程图**:
  ```mermaid
  graph TD
    analyze_conflicts["analyze_conflicts (ai_execution)"]
    resolve_conflicts["resolve_conflicts (ai_execution)"]

    analyze_conflicts --> resolve_conflicts
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run resolve-conflicts --prompt "解决当前分支与 main 分支合并产生的冲突"`

### 2.3 `test-loop-dag`
- **适用场景 (Use Cases)**: 通过迭代式循环不断修复测试套件中的错误，直到所有测试通过。
- **触发条件 (Trigger Conditions)**: CI 失败或本地存在未通过的单元/集成测试。
- **选择策略 (Selection Strategy)**: 专用于自动化消除测试报错，形成“分析错误 -> 应用修复”的闭环。
- **流程图**:
  ```mermaid
  graph TD
    analyze_failures["analyze_failures (ai_execution)"]
    apply_test_fixes["apply_test_fixes (ai_execution)"]

    analyze_failures --> apply_test_fixes
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run test-loop-dag --prompt "修复认证模块的所有失败测试用例"`

---

## 3. 代码审查与拉取请求 (Code Review & Pull Requests)

### 3.1 `smart-pr-review`
- **适用场景 (Use Cases)**: 智能分析现有 PR 的复杂度和风险，动态调度靶向审查代理。
- **触发条件 (Trigger Conditions)**: 有新的 Pull Request 提交，需要智能化评估审查重点。
- **选择策略 (Selection Strategy)**: 适合日常常规的 PR 审核，能自动识别高风险代码区域并集中精力审查。
- **流程图**:
  ```mermaid
  graph TD
    classify_pr["classify_pr (ai_execution)"]
    targeted_review["targeted_review (ai_execution)"]

    classify_pr --> targeted_review
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run smart-pr-review --prompt "审查最近提交的支付网关更新 PR"`

### 3.2 `comprehensive-pr-review`
- **适用场景 (Use Cases)**: 进行极其深度的多维度 PR 审查（并行 5 个审稿人机制），并提出自动化修复建议。
- **触发条件 (Trigger Conditions)**: 需要对核心模块更改、重大架构重构的 PR 进行严苛的代码质量保证。
- **选择策略 (Selection Strategy)**: 当需要最高级别的安全和质量把控时使用，全面覆盖语法规范和逻辑边缘情况。
- **流程图**:
  ```mermaid
  graph TD
    syntax_review["syntax_review (ai_execution)"]
    logic_review["logic_review (ai_execution)"]
    synthesize_reviews["synthesize_reviews (ai_execution)"]

    syntax_review --> synthesize_reviews
    logic_review --> synthesize_reviews
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run comprehensive-pr-review --prompt "全面审查重构系统底层缓存机制的 PR"`

### 3.3 `validate-pr`
- **适用场景 (Use Cases)**: 在合并 PR 前执行深入的测试流程，对比主分支与功能分支的状态。
- **触发条件 (Trigger Conditions)**: 需要确认 PR 中的代码不会破坏现有业务逻辑。
- **选择策略 (Selection Strategy)**: 偏重于运行真实测试和收集结果，而非依赖 AI 进行代码语义层面的审查。
- **流程图**:
  ```mermaid
  graph TD
    run_feature_tests["run_feature_tests (bash)"]
    analyze_test_results["analyze_test_results (ai_execution)"]

    run_feature_tests --> analyze_test_results
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run validate-pr --prompt "运行所有集成测试验证 #204 号 PR"`

---

## 4. 问题追踪与修复 (Issue Tracking & Resolution)

### 4.1 `create-issue`
- **适用场景 (Use Cases)**: 将模糊的问题描述或 Bug 报告转换为标准化、包含充足上下文的 GitHub Issue。
- **触发条件 (Trigger Conditions)**: 用户口头或用简单自然语言描述了一个系统异常或新需求。
- **选择策略 (Selection Strategy)**: 专门用于信息收集和工单起草，不会对代码库进行任何实质性修改。
- **流程图**:
  ```mermaid
  graph TD
    gather_context["gather_context (ai_execution)"]
    draft_issue["draft_issue (ai_execution)"]

    gather_context --> draft_issue
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run create-issue --prompt "用户报告在移动端结账页面出现偶尔的白屏问题"`

### 4.2 `fix-github-issue`
- **适用场景 (Use Cases)**: 针对给定的 GitHub Issue 提供一条龙服务：分类、调查、实现、验证、代码审查及自我修复。
- **触发条件 (Trigger Conditions)**: 用户指定了一个具体的 GitHub Issue 链接或编号要求修复。
- **选择策略 (Selection Strategy)**: 针对单个已知 Issue 的标准端到端自动修复工作流。
- **流程图**:
  ```mermaid
  graph TD
    classify_and_plan["classify_and_plan (ai_execution)"]
    implement_fix["implement_fix (ai_execution)"]
    validate_fix["validate_fix (bash)"]
    review_fix["review_fix (ai_execution)"]

    classify_and_plan --> implement_fix
    implement_fix --> validate_fix
    validate_fix --> review_fix
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run fix-github-issue --prompt "修复 #142 号 Issue 中的内存泄漏问题"`

### 4.3 `issue-review-full`
- **适用场景 (Use Cases)**: 针对极其关键的 GitHub Issue 提供彻底的修复，并额外附加安全性、性能等多维度的专门审查。
- **触发条件 (Trigger Conditions)**: 正在处理对系统稳定性或数据安全有重大影响的高优先级严重工单（如 P0 级 Bug）。
- **选择策略 (Selection Strategy)**: 比普通的 `fix-github-issue` 流程更重，增加了性能审查和安全漏洞扫描节点。
- **流程图**:
  ```mermaid
  graph TD
    investigate_issue["investigate_issue (ai_execution)"]
    implement_issue_fix["implement_issue_fix (ai_execution)"]
    security_review["security_review (ai_execution)"]
    performance_review["performance_review (ai_execution)"]

    investigate_issue --> implement_issue_fix
    implement_issue_fix --> security_review
    implement_issue_fix --> performance_review
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run issue-review-full --prompt "紧急调查并修复导致高并发时数据库死锁的 #89 工单"`

---

## 5. 通用助手与特定任务 (General Assistant & Specific Tasks)

### 5.1 `assist`
- **适用场景 (Use Cases)**: 通用问答、无特定计划的问题调试、代码库探索以及一般性的交互辅助。
- **触发条件 (Trigger Conditions)**: 用户提出宽泛的疑问、寻求建议或需要了解代码库某个部分的工作原理。
- **选择策略 (Selection Strategy)**: 作为最基础的默认工作流，结构最简单，适用于无需多步流转的轻量级任务。
- **流程图**:
  ```mermaid
  graph TD
    analyze_request["analyze_request (ai_execution)"]
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run assist --prompt "请解释一下 src/utils/auth.js 中的 JWT 鉴权逻辑"`

### 5.2 `custom-deploy-pipeline`
- **适用场景 (Use Cases)**: 自定义的部署管线，用于将特定功能分支部署至 Staging（预发）环境并触发 QA 验证。
- **触发条件 (Trigger Conditions)**: 用户要求部署当前已完成的功能并申请质量保证人员验收。
- **选择策略 (Selection Strategy)**: 包含了环境风险分析、代码构建、自动部署以及验收签收的完整 CI/CD 流程。
- **流程图**:
  ```mermaid
  graph TD
    analyze_deployment_risk["analyze_deployment_risk (ai_execution)"]
    build_project["build_project (bash)"]
    deploy_to_staging["deploy_to_staging (bash)"]
    qa_sign_off["qa_sign_off (ai_execution)"]

    analyze_deployment_risk --> build_project
    build_project --> deploy_to_staging
    deploy_to_staging --> qa_sign_off
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run custom-deploy-pipeline --prompt "将当前分支构建并部署到 staging 环境"`

### 5.3 `remotion-generate`
- **适用场景 (Use Cases)**: 结合 AI 能力生成或修改基于 Remotion 框架的视频合成代码（React 视频渲染）。
- **触发条件 (Trigger Conditions)**: 用户需要在基于 Remotion 的项目中生成新的媒体/视频组件。
- **选择策略 (Selection Strategy)**: 特化的特定领域（领域特定）工作流，专注于媒体生成任务而非一般前端或后端逻辑。
- **流程图**:
  ```mermaid
  graph TD
    generate_composition["generate_composition (ai_execution)"]
  ```
- **使用范例 (Execution Example)**: 
  `team-agents-cowork run remotion-generate --prompt "生成一个 15 秒长的产品特性介绍视频的 Remotion 组件"`
