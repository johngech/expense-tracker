import { AuthMiddleware, ExpenseOwnershipMiddleware } from "../middleware";
import { ExpenseService, type ExpenseDto } from "../services";
import type { Request, Response, Router } from "express";

export class ExpenseController {
  public constructor(
    private readonly expenseService: ExpenseService,
    private readonly app: Router,
  ) {}

  public registerRoutes() {
    this.app.get("/expenses", this.getAll);
    this.app.get("/expenses/:id", this.getById);
    this.app.post("/expenses", AuthMiddleware.handle, this.create);
    this.app.patch(
      "/expenses/:id",
      AuthMiddleware.handle,
      ExpenseOwnershipMiddleware.handle,
      this.update,
    );
    this.app.delete(
      "/expenses/:id",
      AuthMiddleware.handle,
      ExpenseOwnershipMiddleware.handle,
      this.delete,
    );
  }

  private getAll = async (request: Request, response: Response) => {
    const expenses = await this.expenseService.getAll();
    response.status(200).send(expenses);
  };

  private getById = async (request: Request, response: Response) => {
    const expenseId = Number(request.params.id);
    const expense = await this.expenseService.getById(expenseId);
    if (!expense) {
      response.status(404).send({ error: "Expense not found" });
      return;
    }
    response.status(200).send(expense);
  };

  private create = async (request: Request, response: Response) => {
    const expenseDto: ExpenseDto = request.body;
    const expense = await this.expenseService.create(expenseDto);
    response.status(201).send(expense);
  };

  private update = async (request: Request, response: Response) => {
    const expenseId = Number(request.params.id);
    const expenseData = request.body;
    const expense = await this.expenseService.update(expenseId, expenseData);
    if (!expense) {
      response.status(404).send({ error: "Expense not found" });
      return;
    }
    response.status(200).send(expense);
  };

  private delete = async (request: Request, response: Response) => {
    const expenseId = Number(request.params.id);
    await this.expenseService.getById(expenseId);
    response.status(204).send();
  };
}
