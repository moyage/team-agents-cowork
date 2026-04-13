# 05 - 硬核验证标准 (Verification Standard)

## 什么是有效的验证凭证 (Proof of Work)？
有效的验证不能是一句“我已检查完毕，代码无误”。必须提供以下物理证明：
1. **执行了何种探针？** （例如：`pytest tests/test_auth.py` 或 `curl -I http://localhost:8080/health`）
2. **执行的原始输出是什么？** （提供 stdout / stderr 原文）
3. **最终的系统状态码是否为 0？** 

如果任务是“创建配置文件”，验证指令必须是 `test -f config.yaml && grep "port" config.yaml`。

无此标准凭证的 PR 或阶段交付，将被拦截门禁打回。
