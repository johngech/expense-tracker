import { UserService } from "./";
import bcrypt from "bcrypt";
import { JwtService } from "./JwtService";

export interface LoginRequest {
  email: string;
  password: string;
}

interface JwtResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  public constructor(
    private readonly userService: UserService = new UserService(),
  ) {}

  public async login(credential: LoginRequest): Promise<JwtResponse> {
    const user = await this.userService.findByEmail(credential.email);
    if (!user || !(await bcrypt.compare(credential.password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const accessToken = JwtService.generateAccessToken(user.id, user.email);
    const refreshToken = JwtService.generateRefreshToken(user.id, user.email);
    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  public async getProfile(userId: number) {
    const user = await this.userService.getById(userId);
    if (!user) throw new Error("User not found");
    return user;
  }
}
