#!/usr/bin/env python3
import os
import sys

DEPRECATION_WARNING = "WARNING: This script is deprecated in V0.8 and will be permanently removed in V0.9. Its functionality has migrated to the Node.js MCP server (src/mcp-server/).\n"

def check_dir(d):
    if not os.path.exists(d):
        print(f"❌ [FAIL] Missing required directory: {d}")
        return False
    print(f"✅ [OK] Directory exists: {d}")
    return True

def main():
    print("🩺 Running agent-collab-kit diagnostic...")
    dirs = ['protocol', 'templates', 'adapters', 'scripts']
    success = all(check_dir(d) for d in dirs)

    if not success:
        sys.exit(1)
    print("✨ Environment is healthy and compliant with Team Agent Collaboration Protocol structure.")

if __name__ == '__main__':
    sys.stderr.write(DEPRECATION_WARNING)
    main()
