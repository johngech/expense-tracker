import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/api", (request: Request, response: Response) => {
  response.send({
    message: "Hello world!",
  });
});

app.get("/api/users", (request: Request, response: Response) => {
  response.send([
    { id: 1, name: "John" },
    { id: 2, name: "Dereje" },
  ]);
});

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`The web server is listening on http://localhost:${port}`);
});
