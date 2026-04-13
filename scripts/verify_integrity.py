#!/usr/bin/env python3
import os
import sys
import json
import hashlib

MANIFEST_PATH = "ci/integrity-manifest.json"
RESULT_PATH = "ci/integrity-result.json"

def calculate_sha256(filepath):
    sha256_hash = hashlib.sha256()
    with open(filepath, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

def verify_integrity():
    if not os.path.exists(MANIFEST_PATH):
        print(f"❌ Error: Integrity manifest not found at {MANIFEST_PATH}")
        sys.exit(1)

    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    expected_hashes = manifest.get("hashes", {})
    mismatches = []
    missing_files = []

    for filepath, expected_hash in expected_hashes.items():
        if not os.path.exists(filepath):
            missing_files.append(filepath)
            continue
            
        current_hash = calculate_sha256(filepath)
        if current_hash != expected_hash:
            mismatches.append(filepath)

    result = {
        "status": "pass" if not mismatches and not missing_files else "fail",
        "mismatched_files": mismatches,
        "missing_files": missing_files
    }

    with open(RESULT_PATH, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2)

    if result["status"] == "fail":
        print("\n❌ INTEGRITY CHECK FAILED ❌")
        print("The following protected files have been modified or deleted without authorization:")
        
        for file in mismatches:
            print(f"  - 📝 MODIFIED: {file}")
        for file in missing_files:
            print(f"  - 🗑️ DELETED: {file}")
            
        print("\n💡 How to resolve:")
        print("If these changes are intentional and legitimate (e.g., you are updating protocol rules):")
        print("  1. Run `python3 scripts/update_integrity_manifest.py` locally.")
        print("  2. Commit the updated `ci/integrity-manifest.json` along with your changes.")
        print("If you did not intend to modify these files, please revert your changes.\n")
        sys.exit(1)
    else:
        print("✅ Integrity check passed. All protected files match their expected signatures.")
        sys.exit(0)

if __name__ == "__main__":
    verify_integrity()
