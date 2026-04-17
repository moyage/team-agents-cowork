#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

const commands = {
  'init': path.join(__dirname, 'agent-protocol-init'),
  'uninstall': path.join(__dirname, 'agent-protocol-uninstall.js'),
  'review': path.join(__dirname, 'agent-protocol-review'),
  'run': path.join(__dirname, 'agent-protocol-run.js'),
  'doctor': path.join(__dirname, 'agent-protocol-doctor.js'),
  'mcp': path.join(__dirname, '../src/mcp-server/build/index.js')
};

// Parse --mode=solo|team flag
let mode = null;
const modeArgIndex = args.findIndex(arg => arg.startsWith('--mode='));
if (modeArgIndex !== -1) {
  mode = args[modeArgIndex].split('=')[1];
}

if (mode === 'team') {
  console.warn('⚠️ Team Mode enforces strict MCP Headless Worktree isolation.');
} else if (mode === 'solo') {
  console.log('ℹ️ Solo Mode active. Local concurrent workspace.');
}

if (!command || !commands[command]) {
  console.error(`Usage: team-agents-cowork <command> [--mode=solo|team]

Commands:
  init       - Initialize the multi-agent workspace (.agent-state)
  uninstall  - Cleanly remove framework files and prune orphaned worktrees
  review     - Run the L3 Gatekeeper review daemon
  run        - Execute a workflow from a YAML file
  doctor     - Diagnose Node env, .agent-state, and MCP build status
  mcp        - Start the MCP server

Options:
  --mode=solo|team  - Set execution mode (solo = local workspace, team = headless worktree isolation)

Examples:
  npx team-agents-cowork init
  team-agents-cowork run workflow.yaml
  team-agents-cowork doctor
  team-agents-cowork mcp
  team-agents-cowork review --mode=solo`);
  process.exit(1);
}

const scriptPath = commands[command];
const env = { ...process.env };
if (mode) {
  env.TEAM_AGENTS_COWORK_MODE = mode;
}

try {
  const result = spawnSync(process.execPath, [scriptPath, ...args.slice(1)], { stdio: 'inherit', env });
  process.exit(result.status !== null ? result.status : 1);
} catch (e) {
  console.error(`❌ Failed to execute ${command}:`, e.message);
  process.exit(1);
}