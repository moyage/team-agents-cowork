import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVER_PATH = path.resolve(__dirname, "index.ts");

async function main() {
  console.log("==========================================");
  console.log(" M4 Integration Test Client Starting...");
  console.log("==========================================\n");

  const transport = new StdioClientTransport({
    command: "npx",
    args: ["tsx", SERVER_PATH],
    stderr: "inherit"
  });

  const client = new Client(
    { name: "m4-integration-client", version: "1.0.0" },
    { capabilities: {} }
  );

  console.log("-> Connecting to local MCP server via stdio...");
  await client.connect(transport);
  console.log("-> Connection established!\n");

  const toolsToTest = [
    { name: "get_dispatch_state", args: {} },
    { name: "get_execution_diff", args: { baseline_commit: "HEAD~1" } }
  ];

  for (const tool of toolsToTest) {
    console.log("------------------------------------------");
    console.log(` Test: ${tool.name}`);
    console.log("------------------------------------------");
    try {
      const result: any = await client.callTool({
        name: tool.name,
        arguments: tool.args
      });
      
      if (result.isError) {
        console.error(`[SERVER REPORTED ERROR] ${tool.name} failed:`);
        console.error(JSON.stringify(result.content, null, 2));
      } else {
        console.log(`[SUCCESS] ${tool.name} response:`);
        // Print truncated if too long, otherwise full
        const output = JSON.stringify(result.content, null, 2);
        if (output.length > 1000) {
            console.log(output.substring(0, 1000) + "\n... [TRUNCATED] ...");
        } else {
            console.log(output);
        }
      }
    } catch (e: any) {
      console.error(`[FATAL CLIENT ERROR] calling ${tool.name} failed:`, e.message);
    }
    console.log("");
  }

  console.log("-> Integration tests completed. Closing connection...");
  await transport.close();
  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Fatal Error:", error);
  process.exit(1);
});
