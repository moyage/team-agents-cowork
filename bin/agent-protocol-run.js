#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = process.cwd();
const workflowArg = process.argv[2];

if (!workflowArg) {
  console.error("❌ Please provide a workflow file. Example: team-agents-cowork run feature.yaml");
  process.exit(1);
}

const workflowPath = path.resolve(PROJECT_ROOT, workflowArg);
if (!fs.existsSync(workflowPath)) {
  console.error(`❌ Workflow file not found at: ${workflowPath}`);
  process.exit(1);
}

// Ensure .agent-state exists
const agentStateDir = path.join(PROJECT_ROOT, '.agent-state');
if (!fs.existsSync(agentStateDir)) {
  console.error("❌ .agent-state not found. Please run 'team-agents-cowork init' first.");
  process.exit(1);
}

const dispatchPath = path.join(agentStateDir, 'workflow', 'dispatch.json');

try {
  let dispatch = {
    "active_iteration": path.basename(workflowArg, '.yaml'),
    "current_gate": "kickoff_pending",
    "executor": null,
    "reviewer_required": false,
    "active_task": null,
    "stop_conditions": [],
    "next_expected_artifact": "tasks/kickoff-packet.md",
    "workflow_source": workflowArg
  };

  if (fs.existsSync(dispatchPath)) {
    console.log(`⚠️ Overwriting existing dispatch.json with new workflow: ${workflowArg}`);
  }

  // Ensure workflow dir exists
  fs.mkdirSync(path.dirname(dispatchPath), { recursive: true });
  fs.writeFileSync(dispatchPath, JSON.stringify(dispatch, null, 2), 'utf8');

  console.log(`✅ Workflow '${workflowArg}' dispatched successfully.`);
  console.log(`📄 Initial state written to: .agent-state/workflow/dispatch.json`);
  console.log(`🚀 Your AI agents can now connect via MCP to read the task state and begin execution.`);

} catch (error) {
  console.error("❌ Failed to initialize workflow:", error.message);
  process.exit(1);
}