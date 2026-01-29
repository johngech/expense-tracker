import type { Expense } from "@prisma/client";
import { PrismaService } from "./";
import { BadRequestError, NotFoundError } from "../errors";

export interface ExpenseDto {
  title: string;
  amount: number;
  category: string;
  note: string | null;
  expenseDate: Date;
  //   createdAt: Date; // Default
  userId: number;
}

export class ExpenseService {
  private get prisma() {
    return PrismaService.getClient();
  }

  public async getAll(): Promise<Expense[]> {
    return this.prisma.expense.findMany({
      orderBy: { expenseDate: "desc" },
    });
  }

  public async getById(id: number): Promise<Expense> {
    const expense = await this.prisma.expense.findUnique({
      where: { id: id },
    });
    if (!expense) {
      throw new NotFoundError("Expense not found");
    }
    return expense;
  }

  public async create(data: ExpenseDto): Promise<Expense> {
    const expense = await this.prisma.expense.create({
      data: {
        title: data.title,
        note: data.note ?? "",
        amount: data.amount,
        category: data.category,
        expenseDate: data.expenseDate,
        userId: data.userId,
      },
    });
    if (!expense) {
      throw new BadRequestError();
    }
    return expense;
  }

  public async update(
    id: number,
    data: Partial<Pick<Expense, "title" | "note" | "amount" | "category">>,
  ): Promise<Expense> {
    const expense = await this.prisma.expense.update({
      where: { id: id },
      data,
    });
    if (!expense) {
      throw new NotFoundError("Expense not found");
    }
    return expense;
  }

  public async delete(id: number): Promise<void> {
    const expense = await this.getById(id);
    if (!expense) {
      throw new NotFoundError("Expense not found");
    }
    await this.prisma.expense.delete({ where: { id: id } });
  }
}
