import express from "express";
import dotenv from "dotenv";
import { UserService, ExpenseService } from "./services";
import { ExpenseController, UserController } from "./controllers";

dotenv.config();

const app = express();
app.use(express.json());

const userController = new UserController(new UserService(), app);
userController.registerRoutes();

const expenseController = new ExpenseController(new ExpenseService(), app);
expenseController.registerRoutes();

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`The web server is listening on http://localhost:${port}`);
});
