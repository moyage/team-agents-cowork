# 🚀 Quickstart: 3 分钟极速接入

本指南将教你如何非侵入式地为你的**个人项目**注入团队 Agent 协作协议。

## Step 1: 运行 Setup
在克隆了本仓库的目录下，执行交互式安装脚本：
```bash
./setup.sh
```
*或者直接通过参数免交互运行：*
`./setup.sh --target ../my-awesome-project --ide cursor --profile default`

## Step 2: 验证注入
前往你的目标项目，你会发现多了以下文件：
- `.cursorrules` (或对应的 IDE 规则)：限制 Agent 的底层指令。
- `AGENTS.md`：团队级协作规范声明。
- `.agent-profile.yaml`：当前项目的宽严级别配置。

## Step 3: 开始工作 (5-Step 体验)
打开你的 IDE (如 Cursor)，唤醒 Agent：
> "Hi, 请读取 AGENTS.md 和 templates/SPEC_TEMPLATE.md，我们要开始开发新功能 X。"

**🎉 恭喜！你的 Agent 已经被套上了防幻觉的缰绳。**

## 想要卸载？
这套协议是无状态、非侵入的。随时执行 `./scripts/uninstall.sh --target ../my-awesome-project` 即可一键剥离，不留痕迹。
