import { AppError } from "./AppError";

export class BadRequestError extends AppError {
  public constructor(message = "Bad Request") {
    super(400, message);
  }
}
