import dotenv from "dotenv";
import { exec } from "child_process";

// Initialize dotenv to use environment variables
dotenv.config();

const isLocal = process.argv[2] === "local";

const projectId = process.env.SUPABASE_PROJECT_ID;
if (!projectId) {
  console.error("SUPABASE_PROJECT_ID is not set in your environment variables.");
  process.exit(1);
}

// Command you want to execute
const command = `yarn --silent supabase gen types typescript ${isLocal ? "--local" : `--project-id ${projectId}`} > ./src/graphql/database.types.ts`;

// Execute the command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Execution error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});

