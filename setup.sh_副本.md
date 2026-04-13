#!/usr/bin/env bash
set -e

echo "🚀 Starting Team Agent Collaboration Protocol Setup..."

TARGET_DIR=""
IDE=""
PROFILE=""

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --help|-h)
            echo "Usage: ./setup.sh [OPTIONS]"
            echo "Options:"
            echo "  --target <dir>     Target project directory"
            echo "  --ide <ide>        Target IDE (cursor, trae, claude_code, auto)"
            echo "  --profile <name>   Profile name (strict, default, legacy)"
            echo "  --help, -h         Show this help message"
            exit 0
            ;;
        --target) TARGET_DIR="$2"; shift ;;
        --ide) IDE="$2"; shift ;;
        --profile) PROFILE="$2"; shift ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

# Interactive fallback
if [ -z "$TARGET_DIR" ]; then
    read -p "📂 1/3 Enter target project directory (e.g., ../my-app): " TARGET_DIR
fi

# Auto-sniffing logic
SNIFFED=""
if [ -d "$TARGET_DIR/.cursor" ] || [ -f "$TARGET_DIR/.cursorrules" ]; then
    SNIFFED="cursor"
elif [ -d "$TARGET_DIR/.trae" ] || [ -f "$TARGET_DIR/.traerules" ]; then
    SNIFFED="trae"
elif [ -f "$TARGET_DIR/CLAUDE.md" ]; then
    SNIFFED="claude_code"
elif [ -d "$TARGET_DIR/.vscode" ]; then
    # Default to cursor for VSCode environments if no other clues exist
    SNIFFED="cursor"
fi

if [ "$IDE" = "auto" ]; then
    if [ -n "$SNIFFED" ]; then
        echo "🔍 Auto-sniffed IDE environment: $SNIFFED"
        IDE="$SNIFFED"
    else
        echo "⚠️  Could not auto-detect IDE environment."
        read -p "💻 Select IDE [cursor/trae/claude_code]: " IDE
    fi
elif [ -z "$IDE" ]; then
    if [ -n "$SNIFFED" ]; then
        echo "🔍 Auto-sniffed IDE environment: $SNIFFED"
        IDE="$SNIFFED"
    else
        read -p "💻 2/3 Select IDE [cursor/trae/claude_code]: " IDE
    fi
fi

if [ -z "$PROFILE" ]; then
    read -p "⚙️  3/3 Select Profile [strict/default/legacy]: " PROFILE
fi

if [ ! -d "$TARGET_DIR" ]; then
    echo "Creating target directory $TARGET_DIR..."
    mkdir -p "$TARGET_DIR"
fi

echo "🔄 Injecting protocol into $TARGET_DIR..."
python3 ./scripts/sync_to_target.py "$TARGET_DIR" "$IDE" "$PROFILE"
echo "✅ Setup successfully completed for $TARGET_DIR!"
