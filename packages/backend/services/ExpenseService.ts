import type { Expense } from "@prisma/client";
import { PrismaService } from "./PrismaService";

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

  public async getById(id: number): Promise<Expense | null> {
    return this.prisma.expense.findUnique({
      where: { id: id },
    });
  }

  public async create(data: ExpenseDto): Promise<Expense> {
    return this.prisma.expense.create({
      data: {
        title: data.title,
        note: data.note ?? "",
        amount: data.amount,
        category: data.category,
        expenseDate: data.expenseDate,
        userId: data.userId,
      },
    });
  }

  public async update(
    id: number,
    data: Partial<Pick<Expense, "title" | "note" | "amount" | "category">>,
  ): Promise<Expense> {
    return this.prisma.expense.update({
      where: { id: id },
      data,
    });
  }

  public async delete(id: number): Promise<void> {
    this.prisma.expense.delete({ where: { id: id } });
  }
}
