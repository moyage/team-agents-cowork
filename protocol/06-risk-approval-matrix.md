# 06 - 风险审批矩阵 (Risk Approval Matrix)

## 默认需人工确认（Approve）的高危操作
Agent 在执行以下操作前，必须阻塞并等待人工审批（Human-in-the-loop）：
- 覆盖或删除环境级关键配置文件（如 `docker-compose.yml`, 核心数据库 Schema）。
- 提交代码到长期保护分支（如 `main`, `master`）。
- 执行任何可能推送到远端服务器的操作（如 `git push`, `docker push`）。
- 创建 Tag 或 Release。
- 操作系统级别的凭证或敏感数据读取与覆写。
