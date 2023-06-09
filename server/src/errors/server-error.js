import { CustomError } from "./custom-error.js";

export default class ServerError extends CustomError {
  statusCode = 500;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, ServerError.prototype);
  }

  getErrorMessage() {
    return { message: this.message };
  }
}