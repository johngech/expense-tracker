import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (request: Request, response: Response) => {
  response.send({
    message: "Hello world!",
  });
});

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`The web server is listening on http://localhost:${port}`);
});
