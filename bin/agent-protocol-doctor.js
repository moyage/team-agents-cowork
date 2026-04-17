#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = process.cwd();

console.log(`\n\x1b[36m=== Team Agents Cowork Doctor ===\x1b[0m\n`);

let issues = 0;

function check(message, condition, helpText) {
  if (condition) {
    console.log(`✅ \x1b[32m${message}\x1b[0m`);
  } else {
    console.log(`❌ \x1b[31m${message}\x1b[0m`);
    if (helpText) console.log(`   \x1b[33mFix:\x1b[0m ${helpText}`);
    issues++;
  }
}

// 1. Node Version
const nodeVersion = process.version;
check(`Node.js Version (${nodeVersion})`, Number(nodeVersion.match(/^v(\d+)/)[1]) >= 16, `Upgrade Node.js to v16 or higher.`);

// 2. Framework State
const stateDir = path.join(PROJECT_ROOT, '.agent-state');
check(`.agent-state directory exists`, fs.existsSync(stateDir), `Run 'team-agents-cowork init' to initialize the workspace.`);

if (fs.existsSync(stateDir)) {
  const dispatchPath = path.join(stateDir, 'workflow', 'dispatch.json');
  check(`dispatch.json exists`, fs.existsSync(dispatchPath), `Run a workflow via 'team-agents-cowork run <file.yaml>'.`);
  
  const registryPath = path.join(stateDir, 'registry.json');
  check(`registry.json exists`, fs.existsSync(registryPath), `Run 'team-agents-cowork init' to re-scaffold missing registry.`);
}

// 3. MCP Build
const mcpPath = path.join(__dirname, '../src/mcp-server/build/index.js');
check(`MCP Server Built (${mcpPath})`, fs.existsSync(mcpPath), `Run 'npm run prepublishOnly' or reinstall the package so the build step runs.`);

// 4. Bridge Config
const bridgeCmd = process.env.TEAM_AGENTS_BRIDGE_CMD;
check(`TEAM_AGENTS_BRIDGE_CMD configured`, !!bridgeCmd, `Export TEAM_AGENTS_BRIDGE_CMD='npx your-agent-bridge' in your environment if you want to use automated L3 gatekeeper reviews.`);

console.log(`\n\x1b[36m=== Diagnosis Complete ===\x1b[0m`);
if (issues === 0) {
  console.log(`\x1b[32mEnvironment looks healthy! You are ready to cowork.\x1b[0m\n`);
} else {
  console.log(`\x1b[33mFound ${issues} issue(s) that might require attention.\x1b[0m\n`);
  process.exit(1);
}