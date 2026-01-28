import bcrypt from "bcrypt";
import { PrismaService } from "../services";
import type {User  } from "@prisma/client";


type SeedUser = {
  name: string;
  email: string;
};

export class Seeder {
  private prisma = PrismaService.getClient();

  public async run(): Promise<void> {
    const users = await this.seedUsers();
    await this.seedExpenses(users);
  }

  private async seedUsers() {
    const password = await bcrypt.hash("password123!", 10);

    const users: SeedUser[] = [
      { name: "Admin User", email: "admin@example.com" },
      { name: "Alice Johnson", email: "alice@example.com" },
      { name: "Bob Smith", email: "bob@example.com" },
      { name: "Charlie Brown", email: "charlie@example.com" },
      { name: "Diana Prince", email: "diana@example.com" },
    ];

    const createdUsers = [];
    for (const user of users) {
      const created = await this.prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          name: user.name,
          email: user.email,
          password,
        },
      });

      createdUsers.push(created);
    }

    return createdUsers;
  }

  private async seedExpenses(users: { id: number }[]): Promise<void> {
    const expenses = [
      { title: "Lunch", amount: 12.5, category: "Food" },
      { title: "Groceries", amount: 45.2, category: "Food" },
      { title: "Internet Bill", amount: 50.0, category: "Utilities" },
      { title: "Electricity Bill", amount: 60.75, category: "Utilities" },
      { title: "Taxi", amount: 8.5, category: "Transport" },
      { title: "Fuel", amount: 70.0, category: "Transport" },
      { title: "Movie Ticket", amount: 15.0, category: "Entertainment" },
      { title: "Gym Membership", amount: 30.0, category: "Health" },
      { title: "Coffee", amount: 4.5, category: "Food" },
      { title: "Books", amount: 25.0, category: "Education" },
      { title: "Online Course", amount: 99.0, category: "Education" },
      { title: "Phone Bill", amount: 20.0, category: "Utilities" },
      { title: "Snacks", amount: 6.75, category: "Food" },
      { title: "Clothing", amount: 120.0, category: "Shopping" },
      {
        title: "Streaming Subscription",
        amount: 14.99,
        category: "Entertainment",
      },
    ];

    let index = 0;

    for (const expense of expenses) {
      const user = users[index % users.length] as User;

      await this.prisma.expense.create({
        data: {
          title: expense.title,
          amount: expense.amount,
          category: expense.category,
          expenseDate: new Date(),
          userId: user.id,
        },
      });

      index++;
    }
  }
}
