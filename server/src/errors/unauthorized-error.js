import { CustomError } from "./custom-error.js";

export default class UnauthorizedError extends CustomError {
  statusCode = 403;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  getErrorMessage() {
    return { message: this.message };
  }
}