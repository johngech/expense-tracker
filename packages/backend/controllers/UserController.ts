import { type UserDto, UserService } from "../services";
import type { Express, Request, Response } from "express";

export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly app: Express,
  ) {}

  public registerRoutes() {
    this.app.get("/users", this.getAll);
    this.app.get("/users/:id", this.getById);
    this.app.post("/users", this.create);
    this.app.patch("/users/:id", this.update);
    this.app.delete("/users/:id", this.delete);
  }

  private getAll = async (request: Request, response: Response) => {
    const users = await this.userService.getAll();
    response.status(200).send(users);
  };

  private getById = async (request: Request, response: Response) => {
    const userId = Number(request.params.id);
    const user = await this.userService.getById(userId);
    if (!user) {
      response.status(404).send({ error: "User not found" });
      return;
    }
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
    if (!user) {
      response.status(404).send({ error: "User not found" });
      return;
    }
    response.status(200).send(user);
  };

  private delete = async (request: Request, response: Response) => {
    const userId = Number(request.params.id);
    this.userService.getById(userId);
    response.status(204).send();
  };
}
