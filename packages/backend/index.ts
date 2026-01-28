import express, { Router } from "express";
import dotenv from "dotenv";
import { UserService, ExpenseService } from "./services";
import { ExpenseController, UserController } from "./controllers";

dotenv.config();

const app = express();
app.use(express.json());

const apiRouter = Router();
const userController = new UserController(new UserService(), apiRouter);
userController.registerRoutes();

const expenseController = new ExpenseController(
  new ExpenseService(),
  apiRouter,
);
expenseController.registerRoutes();

app.use("/api", apiRouter);
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`The web server is listening on http://localhost:${port}`);
});
