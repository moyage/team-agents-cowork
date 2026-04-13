#!/usr/bin/env python3
import os
print("Rendering templates to generated/ directory...")
with open("generated/AGENTS.md", "w") as f: f.write("Rendered AGENTS.md")
with open("generated/.cursorrules", "w") as f: f.write("Rendered .cursorrules")
print("✅ Rendering complete.")\n