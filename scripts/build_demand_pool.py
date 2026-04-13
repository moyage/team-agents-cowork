#!/usr/bin/env python3
import os
import glob
from datetime import datetime

FEEDBACK_DIR = "tasks/feedback"
DEMAND_POOL_FILE = "tasks/demand-pool.md"

def build_demand_pool():
    if not os.path.exists(FEEDBACK_DIR):
        os.makedirs(FEEDBACK_DIR, exist_ok=True)

    feedback_files = glob.glob(os.path.join(FEEDBACK_DIR, "*.md"))
    
    with open(DEMAND_POOL_FILE, "w", encoding="utf-8") as f:
        f.write("# Team Demand Pool (自动聚合需求池)\n\n")
        f.write(f"*最后更新时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n\n")
        
        if not feedback_files:
            f.write("当前没有待处理的反馈日志。\n")
            return
            
        f.write("## 收集到的反馈清单\n\n")
        for file_path in sorted(feedback_files):
            f.write(f"### 📄 来源: `{os.path.basename(file_path)}`\n")
            with open(file_path, "r", encoding="utf-8") as rf:
                content = rf.read().strip()
                # 仅截取前200个字符或前5行作为摘要展示
                lines = content.split('\n')
                summary = '\n'.join(lines[:5])
                if len(summary) > 200:
                    summary = summary[:200] + "..."
                f.write(f"> {summary}\n\n")
                f.write(f"[查看完整详情]({file_path})\n\n---\n")

    print(f"✨ Demand pool successfully generated at {DEMAND_POOL_FILE}")

if __name__ == "__main__":
    build_demand_pool()
