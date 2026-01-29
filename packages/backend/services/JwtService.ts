import jwt, { type SignOptions } from "jsonwebtoken";

export type TokenType = "access" | "refresh";

interface Claims {
  userId: number;
  email?: string;
  type: TokenType;
}

export class JwtService {
  private static readonly SECRET = process.env.JWT_SECRET!;

  private static generateToken(claims: Claims): string {
    const options: SignOptions = {
      expiresIn: claims.type == "access" ? "15m" : "7d",
    };
    return jwt.sign(claims, this.SECRET, options);
  }

  public static verifyToken(token: string, expectedType: TokenType) {
    try {
      const decoded = jwt.verify(token, this.SECRET) as Claims;
      if (decoded.type !== expectedType) throw new Error("Invalid token type");
      return decoded;
    } catch (error: any) {
      const message =
        error.name === "TokenExpiredError" ? "Expired" : "Invalid";
      throw new Error(`${message} ${expectedType} token`);
    }
  }
  
  public static generateAccessToken(userId: number, email?: string): string {
    return this.generateToken({ userId: userId, email: email, type: "access" });
  }

  public static generateRefreshToken(userId: number, email?: string) {
    return this.generateToken({
      userId: userId,
      email: email,
      type: "refresh",
    });
  }
}
