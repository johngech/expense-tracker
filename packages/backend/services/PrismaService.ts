import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

export class PrismaService {
  private static instance: PrismaClient;

  private constructor() {}

  public static getClient() {
    if (!PrismaService.instance) {
      const adapter = new PrismaMariaDb({
        host: process.env.DB_HOST ?? "127.0.0.1",
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 5,
      });
      PrismaService.instance = new PrismaClient({
        log: ["query", "error", "warn"],
        adapter: adapter,
      });
    }
    return PrismaService.instance;
  }

  public static async disconnect() {
    if (PrismaService.instance) {
      await PrismaService.instance.$disconnect();
      PrismaService.instance = undefined!;
    }
  }
}
