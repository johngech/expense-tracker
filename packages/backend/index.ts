import express, { Router } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { envConfig } from "./config/envConfig";
import { UserService, ExpenseService, AuthService } from "./services";
import {
  AuthController,
  ExpenseController,
  UserController,
} from "./controllers";
import { errorMiddleware } from "./middleware";

const port = envConfig.port;

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS config
const corsOptions: cors.CorsOptions = {
  origin: [envConfig.frontendUrl],
  credentials: true, // allow cookies (for refresh tokens)
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

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
