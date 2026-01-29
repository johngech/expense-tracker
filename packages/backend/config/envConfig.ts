import dotenv from "dotenv";
import type { StringValue } from "ms";
dotenv.config();

function loadEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

export const envConfig = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3000),
  frontendUrl: loadEnv("FRONTEND_URL"),

  jwt: {
    jwtSecret: loadEnv("JWT_SECRET"),
    accessTokenExpiration: loadEnv("ACCESS_TOKEN_EXPIRATION") as StringValue,
    refreshTokenExpiration: loadEnv("REFRESH_TOKEN_EXPIRATION") as StringValue,
  },

  database: {
    host: loadEnv("DB_HOST"),
    port: Number(loadEnv("DB_PORT")),
    user: loadEnv("DB_USER"),
    password: loadEnv("DB_PASSWORD"),
    dbName: loadEnv("DB_NAME"),
    url: loadEnv("DATABASE_URL"),
  },

  isProduction: process.env.NODE_ENV === "production",
};
