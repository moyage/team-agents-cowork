#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = process.cwd();
const agentStateDir = path.join(PROJECT_ROOT, '.agent-state');

console.log(`\x1b[36mUninstalling Team Agents Cowork protocol from: ${PROJECT_ROOT}\x1b[0m`);

// 1. Remove .agent-state directory
if (fs.existsSync(agentStateDir)) {
  fs.rmSync(agentStateDir, { recursive: true, force: true });
  console.log(`\x1b[32m✔ Removed .agent-state/ directory.\x1b[0m`);
} else {
  console.log(`\x1b[33mℹ .agent-state/ directory not found.\x1b[0m`);
}

// 2. Remove .agent-state from .gitignore
const gitignorePath = path.join(PROJECT_ROOT, '.gitignore');
if (fs.existsSync(gitignorePath)) {
  let gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  if (gitignoreContent.includes('.agent-state/')) {
    gitignoreContent = gitignoreContent.replace(/^.*\.agent-state\/.*$/gm, '').replace(/\n{2,}/g, '\n');
    fs.writeFileSync(gitignorePath, gitignoreContent, 'utf8');
    console.log(`\x1b[32m✔ Removed .agent-state/ from .gitignore.\x1b[0m`);
  } else {
    console.log(`\x1b[33mℹ .agent-state/ not found in .gitignore.\x1b[0m`);
  }
}

// 3. Prune orphaned Git worktrees (Future-proofing for M2/M3)
try {
  console.log(`\x1b[36mRunning 'git worktree prune' to clean up orphaned headless sandboxes...\x1b[0m`);
  execSync('git worktree prune', { stdio: 'inherit', cwd: PROJECT_ROOT });
  console.log(`\x1b[32m✔ Orphaned Git worktrees pruned.\x1b[0m`);
} catch (e) {
  console.log(`\x1b[33mℹ No Git repository found or worktree prune failed.\x1b[0m`);
}

console.log(`\x1b[32m✨ Uninstallation complete. The workspace is now a clean standard repository.\x1b[0m`);
