#!/usr/bin/env python3
import os
import sys

def check_dir(d):
    if not os.path.exists(d):
        print(f"❌ [FAIL] Missing required directory: {d}")
        return False
    print(f"✅ [OK] Directory exists: {d}")
    return True

print("🩺 Running agent-collab-kit diagnostic...")
dirs = ['protocol', 'templates', 'adapters', 'scripts']
success = all([check_dir(d) for d in dirs])

if not success:
    sys.exit(1)
print("✨ Environment is healthy and compliant with Team Agent Collaboration Protocol structure.")
