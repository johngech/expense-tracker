import express, { Router } from "express";
import { envConfig } from "./config/envConfig";
import { UserService, ExpenseService, AuthService } from "./services";
import {
  AuthController,
  ExpenseController,
  UserController,
} from "./controllers";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware";

const port = envConfig.port;

const app = express();
app.use(express.json());
app.use(cookieParser());

const apiRouter = Router();

const authController = new AuthController(new AuthService(), apiRouter);
authController.registerRoutes();

const userController = new UserController(new UserService(), apiRouter);
userController.registerRoutes();

const expenseController = new ExpenseController(
  new ExpenseService(),
  apiRouter,
);
expenseController.registerRoutes();

app.use("/api", apiRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`The web server is listening on http://localhost:${port}`);
});
