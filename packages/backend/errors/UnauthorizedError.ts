import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
  public constructor(message = "Unauthorized") {
    super(401, message);
  }
}
