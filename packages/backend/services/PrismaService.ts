import { PrismaClient } from "@prisma/client";

export class PrismaService {
  private static instance: PrismaClient;

  private constructor() {}

  public static getClient() {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient({
        log: ["query", "error", "warn"],
      });
    }
    return PrismaService.instance;
  }
}
