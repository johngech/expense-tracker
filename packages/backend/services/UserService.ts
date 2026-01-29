import type { User } from "@prisma/client";
import { PrismaService } from "./PrismaService";
import bcrypt from "bcrypt";
import type { LoginRequest } from "./AuthService";

export interface UserDto {
  name: string;
  email: string;
  password: string;
}

interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

export class UserService {
  private get prisma() {
    return PrismaService.getClient();
  }

  public async getAll(): Promise<UserResponseDto[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  public async getById(userId: number): Promise<UserResponseDto | null> {
    return this.prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      where: { id: userId },
    });
  }

  public async register(data: UserDto): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
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
  ): Promise<UserResponseDto> {
    return this.prisma.user.update({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      where: { id: userId },
      data,
    });
  }

  public async delete(userId: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }
}
