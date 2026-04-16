#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

const commands = {
  'init': path.join(__dirname, 'agent-protocol-init'),
  'review': path.join(__dirname, 'agent-protocol-review'),
  'mcp': path.join(__dirname, '../src/mcp-server/build/index.js')
};

if (!command || !commands[command]) {
  console.error(`Usage: team-agents-cowork <command>

Commands:
  init    - Initialize the multi-agent workspace (.agent-state)
  review  - Run the L3 Gatekeeper review daemon
  mcp     - Start the MCP server

Examples:
  npx team-agents-cowork init
  team-agents-cowork mcp
  team-agents-cowork review`);
  process.exit(1);
}

const scriptPath = commands[command];
try {
  const result = spawnSync(process.execPath, [scriptPath, ...args.slice(1)], { stdio: 'inherit' });
  process.exit(result.status !== null ? result.status : 1);
} catch (e) {
  console.error(`❌ Failed to execute ${command}:`, e.message);
  process.exit(1);
}
