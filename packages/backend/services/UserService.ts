import type { User } from "@prisma/client";
import { PrismaService } from "./PrismaService";
import bcrypt from "bcrypt";

export interface UserDto {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  private prisma = PrismaService.getClient();

  public async getAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  public async getById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  public async register(data: UserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  public async update(
    userId: number,
    data: Partial<Pick<User, "name" | "email">>,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }
  public async delete(userId: number): Promise<void> {
    this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
