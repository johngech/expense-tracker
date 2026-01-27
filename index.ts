import concurrently from "concurrently";

concurrently([
  {
    name: "Frontend",
    command: "bun run dev",
    prefixColor: "cyan",
    cwd: "packages/frontend",
  },
  {
    name: "Backend",
    command: "bun run dev",
    prefixColor: "green",
    cwd: "packages/backend",
  },
]);
