#!/usr/bin/env bash
set -e

TARGET_DIR=""

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --target) TARGET_DIR="$2"; shift ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

if [ -z "$TARGET_DIR" ]; then
    read -p "Enter target project directory to clean: " TARGET_DIR
fi

if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ Directory $TARGET_DIR does not exist."
    exit 1
fi

echo "🧹 Removing protocol files from $TARGET_DIR..."
rm -f "$TARGET_DIR/.cursorrules"
rm -f "$TARGET_DIR/.traerules"
rm -f "$TARGET_DIR/CLAUDE.md"
rm -f "$TARGET_DIR/AGENTS.md"
rm -f "$TARGET_DIR/.agent-profile.yaml"
rm -rf "$TARGET_DIR/ci/protocol-checklist.md"
rm -rf "$TARGET_DIR/templates"
[ -d "$TARGET_DIR/ci" ] && rmdir "$TARGET_DIR/ci" 2>/dev/null || true

echo "✅ Cleaned. Protocol successfully removed."
