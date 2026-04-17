# 快速上手 (Getting Started)

本目录包含将 Team Agents Cowork 引入到你现有项目的首要步骤。

## 目录索引

### 1. [安装与初始化 (Installation)](./installation.md)
详细说明了全局 NPM 安装步骤、环境依赖（Node.js / Git 等）要求，以及在项目根目录运行 `team-agents init` 时，底层到底发生了什么（例如 `.agent-state/` 目录的生成）。

**核心提示**：本框架设计的最高准则之一是 **低侵入性 (Low Invasiveness)**。它的安装与初始化**绝对不会**修改你项目原有的构建脚本或源代码，所有的配置和状态通信都被严格锁死在 `.agent-state` 目录中。如果你不满意，只需 `rm -rf .agent-state` 即可无痕退出。
