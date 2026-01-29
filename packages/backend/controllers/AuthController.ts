import type { Router, Request, Response } from "express";
import type { AuthService } from "../services";
import { JwtService } from "../services/JwtService";
import { AuthMiddleware } from "../middleware";

export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  public registerRoutes() {
    this.router.post("/auth/login", this.login);
    this.router.post("/auth/refresh", this.refresh);
    this.router.get("/auth/me", AuthMiddleware.handle, this.me); // filter the incoming request
  }

  private login = async (request: Request, response: Response) => {
    try {
      const { accessToken, refreshToken } = await this.authService.login(
        request.body,
      );
      response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days // has to be externalize
      });

      response.json({
        token: accessToken,
      });
    } catch (e: any) {
      response.status(401).json({ error: e.message });
    }
  };

  private refresh = async (request: Request, response: Response) => {
    try {
      const refreshToken = request.cookies.refreshToken;
      if (!refreshToken) throw new Error("Refresh token missing");
      const decoded = JwtService.verifyToken(refreshToken, "refresh");
      const accessToken = JwtService.generateAccessToken(
        decoded.userId,
        decoded.email,
      );
      response.json({
        token: accessToken,
      });
    } catch (e: any) {
      response.status(401).json({ error: e.message });
    }
  };

  private me = async (request: Request, response: Response) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        throw new Error("Missing or invalid authorization header");
      }
      const token = authHeader.replace("Bearer ", "");

      const decoded = JwtService.verifyToken(token, "access");

      const user = await this.authService.getProfile(decoded.userId);

      response.json(user);
    } catch (e: any) {
      const status = e.message.includes("token") ? 401 : 404;
      response.status(status).json({ error: e.message });
    }
  };
}
