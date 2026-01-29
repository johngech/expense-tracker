import { envConfig } from "./envConfig";

export class JwtConfig {
  public readonly jwtSecret: string;
  public readonly accessTokenExpiration: number;
  public readonly refreshTokenExpiration: number;

  constructor() {
    this.jwtSecret = envConfig.jwt.jwtSecret;
    this.accessTokenExpiration = envConfig.jwt.accessTokenExpiration;
    this.refreshTokenExpiration = envConfig.jwt.refreshTokenExpiration;
  }
}

export const jwtConfig = new JwtConfig();
