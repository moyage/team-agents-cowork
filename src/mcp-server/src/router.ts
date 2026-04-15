import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface WorkflowDefinition {
  id: string;
  description: string;
  use_when: string;
  nodes: any[];
}

/**
 * Parses all YAML workflows in the specified directory and constructs the LLM routing prompt.
 * @param workflowsDir Directory containing the .yaml workflow definitions.
 * @param userIntent The natural language request from the user.
 * @returns A structured prompt to be sent to the LLM to select the appropriate workflow.
 */
export function evaluateIntent(userIntent: string, workflowsDir: string): string {
  const availableWorkflows: Record<string, string> = {};

  if (fs.existsSync(workflowsDir)) {
    const files = fs.readdirSync(workflowsDir).filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
    
    for (const file of files) {
      try {
        const fullPath = path.join(workflowsDir, file);
        const content = fs.readFileSync(fullPath, 'utf8');
        const doc = yaml.load(content) as any;
        
        if (doc && doc.id && doc.description && doc.use_when) {
          availableWorkflows[doc.id] = `Description: ${doc.description}\nUse when: ${doc.use_when}`;
        }
      } catch (err) {
        console.error(`Failed to parse workflow ${file}:`, err);
      }
    }
  }

  let prompt = `You are the Dynamic Workflow Router for the team-agents-cowork framework.\n\n`;
  prompt += `User Intent: "${userIntent}"\n\n`;
  prompt += `Available Workflows:\n`;
  
  if (Object.keys(availableWorkflows).length === 0) {
    prompt += `(No valid YAML workflows found in ${workflowsDir})\n`;
  } else {
    for (const [id, info] of Object.entries(availableWorkflows)) {
      prompt += `\nWorkflow ID: [${id}]\n${info}\n`;
    }
  }
  
  prompt += `\nTask: Based on the user's intent, select the single best Workflow ID from the list above. Return ONLY a JSON payload matching this schema: {"selected_workflow": "<ID>", "confidence": 0.0to1.0, "reasoning": "brief explanation"}`;
  
  return prompt;
}
