import {
  AuthMiddleware,
  UserOwnershipMiddleware,
  validateBodyMiddleware,
} from "../middleware";
import { CreateUserSchema, UpdateUserSchema } from "../schemas";
import { type UserDto, UserService } from "../services";
import type { Request, Response, Router } from "express";

export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly app: Router,
  ) {}

  public registerRoutes() {
    this.app.get("/users", AuthMiddleware.handle, this.getAll);
    this.app.get("/users/:id", AuthMiddleware.handle, this.getById);
    this.app.post(
      "/users",
      validateBodyMiddleware(CreateUserSchema),
      this.create,
    );
    this.app.patch(
      "/users/:id",
      validateBodyMiddleware(UpdateUserSchema),
      AuthMiddleware.handle,
      UserOwnershipMiddleware.handle,
      this.update,
    );
    this.app.delete(
      "/users/:id",
      AuthMiddleware.handle,
      UserOwnershipMiddleware.handle,
      this.delete,
    );
  }

  private getAll = async (request: Request, response: Response) => {
    const users = await this.userService.getAll();
    response.status(200).send(users);
  };

  private getById = async (request: Request, response: Response) => {
    const userId = Number(request.params.id);
    const user = await this.userService.getById(userId);
    response.status(200).send(user);
  };

  private create = async (request: Request, response: Response) => {
    const userDto: UserDto = request.body;
    const user = await this.userService.register(userDto);
    response.status(201).send(user);
  };

  private update = async (request: Request, response: Response) => {
    const userId = Number(request.params.id);
    const userData = request.body;
    const user = await this.userService.update(userId, userData);
    response.status(200).send(user);
  };

  private delete = async (request: Request, response: Response) => {
    const userId = Number(request.params.id);
    await this.userService.delete(userId);
    response.status(204).send();
  };
}
