# 防篡改 CI (Protocol Integrity Guard)

为确保 Team Agent Collaboration Protocol 不会被错误地静默修改，本仓库实现了极轻量、基于哈希指纹的防篡改 CI 机制。

## 1. 为什么需要防篡改？
在多 Agent 和多人类协同的开发流中，底层协议文件（如 `.cursorrules` 模板、执行脚本 `setup.sh`）是不可跨越的底线边界。本机制旨在：
- **防误操作**：防止 AI 幻觉修改底层规则库而未被人类察觉。
- **强制可审计**：任何对底线规则的修改，必须伴随指纹更新，强迫修改者进行思考与声明。

*(注：本机制并非对抗外部黑客的绝对供应链安全防线，而是针对内部协同磨擦的一道物理隔离。)*

## 2. 哪些文件受保护？
当前被保护的核心资产记录在 `ci/integrity-manifest.json` 中，主要包含：
- **核心安装与分发引擎**: `setup.sh`, `install.sh`, `scripts/sync_to_target.py`
- **Agent 底层规则指令模板**: `adapters/*.tpl`
- **安全拦截配置**: `profiles/*.yaml`

*(普通的文档文件如 README、规划等不纳入强保护，修改它们不会触发 CI 报错)*

## 3. 校验与更新流转
如果你在本地修改了上述受保护的文件，你必须执行以下命令更新安全基线：

```bash
# 更新安全指纹基线
python3 scripts/update_integrity_manifest.py
```
这会重新计算文件的 `SHA-256` 并更新 `ci/integrity-manifest.json`。你必须将修改的文件与更新后的清单一并提交（Commit）。

## 4. 机器可读的验证集成
你也可以在本地随时执行校验：
```bash
python3 scripts/verify_integrity.py
```
该脚本除了在标准输出打印人类易读的结果外，还会在 `ci/integrity-result.json` 生成包含 `mismatched_files` 的结构化校验快照，可供后续的自动化验收流提取使用。在 GitHub Actions 执行时，此 JSON 也会被打包为 Artifact 留存。
