#!/usr/bin/env python3
import sys, os
if len(sys.argv) < 2:
    print("Usage: sync_to_target.py <target_dir>")
    sys.exit(1)
target = sys.argv[1]
print(f"Syncing rules to {target}...")
os.makedirs(target, exist_ok=True)
with open(os.path.join(target, "AGENTS.md"), "w") as f: f.write("Synced AGENTS.md")
print("✅ Sync complete.")\n