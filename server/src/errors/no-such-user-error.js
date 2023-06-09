import { CustomError } from "./custom-error.js";

export default class NoSuchResourceError extends CustomError {
  statusCode = 401;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, NoSuchResourceError.prototype);
  }

  getErrorMessage() {
    return { message: this.message };
  }
}