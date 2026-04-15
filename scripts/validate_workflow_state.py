#!/usr/bin/env python3
"""
Minimal Schema Validator for Workflow State
Validates JSON files against defined schemas without external dependencies.
"""
import json
import os
import sys
import argparse

DEPRECATION_WARNING = "WARNING: This script is deprecated in V0.8 and will be permanently removed in V0.9. Its functionality has migrated to the Node.js MCP server (src/mcp-server/).\n"

def validate_schema(data_path, schema_path):
    if not os.path.exists(data_path):
        return False, [f"Data file {data_path} not found."]
    if not os.path.exists(schema_path):
        return False, [f"Schema file {schema_path} not found."]

    with open(data_path, 'r') as f:
        try:
            data = json.load(f)
        except Exception as e:
            return False, [f"Invalid JSON in {data_path}: {e}"]

    with open(schema_path, 'r') as f:
        try:
            schema = json.load(f)
        except Exception as e:
            return False, [f"Invalid JSON in {schema_path}: {e}"]

    errors = []
    # Check required fields
    for req in schema.get('required', []):
        if req not in data:
            errors.append(f"Missing required field: '{req}'")

    # Check enum values
    for prop, prop_schema in schema.get('properties', {}).items():
        if prop in data:
            if 'enum' in prop_schema:
                if data[prop] not in prop_schema['enum']:
                    errors.append(f"Field '{prop}' value '{data[prop]}' not in allowed {prop_schema['enum']}")
            if 'type' in prop_schema:
                expected_type = prop_schema['type']
                # basic type mapping
                type_map = {'string': str, 'array': list, 'object': dict, 'boolean': bool}
                if expected_type in type_map and not isinstance(data[prop], type_map[expected_type]):
                    errors.append(f"Field '{prop}' has wrong type, expected {expected_type}")

    if errors:
        return False, errors
    return True, []

def main():
    parser = argparse.ArgumentParser(description="Validate Workflow State JSONs")
    parser.add_argument('--state', default='workflow/iteration-state.json', help='Path to state file')
    parser.add_argument('--schema', default='schemas/iteration-state.schema.json', help='Path to schema file')
    args = parser.parse_args()

    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    state_file = os.path.join(base_dir, args.state) if not os.path.isabs(args.state) else args.state
    schema_file = os.path.join(base_dir, args.schema) if not os.path.isabs(args.schema) else args.schema

    valid, errors = validate_schema(state_file, schema_file)
    if not valid:
        print(f"::error::Validation Failed for {os.path.basename(args.state)}")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print(f"✅ Validation Passed for {os.path.basename(args.state)}")
        sys.exit(0)

if __name__ == "__main__":
    sys.stderr.write(DEPRECATION_WARNING)
    main()
