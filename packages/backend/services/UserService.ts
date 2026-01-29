import bcrypt from "bcrypt";
import type { User } from "@prisma/client";
import { PrismaService } from "./";
import { BadRequestError, NotFoundError } from "../errors";

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

  public async getById(userId: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  public async register(data: UserDto): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
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
    if (!user) {
      throw new BadRequestError();
    }
    return user;
  }

  public async update(
    userId: number,
    data: Partial<Pick<User, "name" | "email">>,
  ): Promise<UserResponseDto> {
    const user = await this.prisma.user.update({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      where: { id: userId },
      data,
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  public async delete(userId: number): Promise<void> {
    const user = await this.getById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
}
