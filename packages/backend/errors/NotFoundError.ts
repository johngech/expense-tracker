import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  public constructor(message = "Not Found") {
    super(404, message);
  }
}
