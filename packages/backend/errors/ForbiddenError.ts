import { AppError } from "./AppError";

export class ForbiddenError extends AppError {
  public constructor(message = "Forbidden") {
    super(403, message);
  }
}
