#!/usr/bin/env bash
set -e

# Check if we are running in a local cloned repo or via remote execution
if [ ! -f "./setup.sh" ]; then
    echo "🌐 Remote installation mode detected. Fetching protocol definitions..."
    REPO_URL="https://github.com/moyage/team-agents-cowork.git"
    REF="main"
    
    if ! command -v git &> /dev/null; then
        echo "❌ Error: git is required for remote installation."
        exit 1
    fi

    TMP_DIR=$(mktemp -d -t team-agents-cowork-XXXXXX)
    # Ensure cleanup on exit
    trap 'rm -rf "$TMP_DIR"' EXIT
    
    # Clone the repo into temp directory silently
    git clone --depth 1 -b "$REF" "$REPO_URL" "$TMP_DIR" > /dev/null 2>&1
    
    # Execute the actual setup script with all arguments passed
    cd "$TMP_DIR"
    exec ./setup.sh "$@"
else
    # Local mode
    echo "Redirecting to local setup.sh..."
    exec ./setup.sh "$@"
fi
