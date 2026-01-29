import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import { envConfig } from "../config/envConfig";

export class PrismaService {
  private static instance: PrismaClient;

  private constructor() {}

  public static getClient() {
    if (!PrismaService.instance) {
      const { host, port, user, password, dbName } = envConfig.database;
      const adapter = new PrismaMariaDb({
        host: host ?? "127.0.0.1",
        port: port,
        user: user,
        password: password,
        database: dbName,
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
