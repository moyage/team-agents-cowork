import { createRequire } from "module";

const require = createRequire(import.meta.url);
const yaml = require("js-yaml") as {
  load(content: string): unknown;
};

type WorkflowNode = Record<string, unknown>;

type ParsedWorkflow = {
  nodes?: WorkflowNode[];
};

export function parseWorkflow(yamlContent: string): WorkflowNode[] {
  const parsed = yaml.load(yamlContent);

  if (!parsed || typeof parsed !== "object") {
    return [];
  }

  const { nodes } = parsed as ParsedWorkflow;
  return Array.isArray(nodes) ? nodes : [];
}
