#!/usr/bin/env python3
import sys, os, shutil

if len(sys.argv) < 4:
    print("Usage: sync_to_target.py <target_dir> <ide> <profile>")
    sys.exit(1)

target = os.path.abspath(sys.argv[1])
ide = sys.argv[2].lower()
profile = sys.argv[3].lower()

# 1. 映射 IDE 规则
ide_map = {
    "cursor": ("CURSOR_RULES.tpl", ".cursorrules"),
    "trae": ("TRAE_RULES.tpl", ".traerules"),
    "claude_code": ("CLAUDE_CODE_RULES.tpl", "CLAUDE.md")
}

if ide not in ide_map:
    print(f"⚠️  Warning: Unknown IDE '{ide}', defaulting to 'cursor'")
    ide = "cursor"

src_rule, target_rule = ide_map[ide]

# 2. 执行物理拷贝与渲染
os.makedirs(target, exist_ok=True)

def copy_if_exists(src, dst):
    if os.path.exists(src):
        shutil.copy(src, dst)
        print(f"  -> Injected: {os.path.basename(dst)}")
    else:
        print(f"  -> ⚠️ Missing source file: {src}")

copy_if_exists(os.path.join("adapters", src_rule), os.path.join(target, target_rule))
copy_if_exists(os.path.join("adapters", "AGENTS.md.tpl"), os.path.join(target, "AGENTS.md"))

profile_src = os.path.join("profiles", f"{profile}.yaml")
if os.path.exists(profile_src):
    copy_if_exists(profile_src, os.path.join(target, ".agent-profile.yaml"))
else:
    copy_if_exists(os.path.join("profiles", "default.yaml"), os.path.join(target, ".agent-profile.yaml"))

# 创建配置追踪目录
ci_target = os.path.join(target, "ci")
os.makedirs(ci_target, exist_ok=True)
copy_if_exists(os.path.join("ci", "protocol-checklist.md"), os.path.join(ci_target, "protocol-checklist.md"))

# 同步 templates 目录
templates_target = os.path.join(target, "templates")
if os.path.exists("templates"):
    os.makedirs(templates_target, exist_ok=True)
    for tpl in os.listdir("templates"):
        copy_if_exists(os.path.join("templates", tpl), os.path.join(templates_target, tpl))

print(f"✨ Successfully synchronized {ide} rules with {profile} profile.")
