import { envConfig } from "./envConfig";
import type { StringValue } from "ms";

export class JwtConfig {
  public readonly jwtSecret: string;
  public readonly accessTokenExpiration: StringValue;
  public readonly refreshTokenExpiration: StringValue;

  constructor() {
    this.jwtSecret = envConfig.jwt.jwtSecret;
    this.accessTokenExpiration = envConfig.jwt.accessTokenExpiration;
    this.refreshTokenExpiration = envConfig.jwt.refreshTokenExpiration;
  }
}

export const jwtConfig = new JwtConfig();
