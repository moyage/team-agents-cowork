#!/usr/bin/env python3
import os
import sys

templates = ['SPEC_TEMPLATE.md', 'TASK_BREAKDOWN_TEMPLATE.md', 'VERIFY_TEMPLATE.md', 'PR_TEMPLATE.md']
protocols = ['01-collaboration-protocol.md', '05-verification-standard.md']

print("🔍 Verifying Canonical Sources...")
missing = False

for t in templates:
    if not os.path.exists(os.path.join('templates', t)):
        print(f"❌ Missing template: {t}")
        missing = True

for p in protocols:
    if not os.path.exists(os.path.join('protocol', p)):
        print(f"❌ Missing protocol: {p}")
        missing = True

if missing:
    print("🚨 Protocol consistency check failed.")
    sys.exit(1)

print("✅ Canonical Sources are intact.")
