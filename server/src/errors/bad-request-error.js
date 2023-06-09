import { CustomError } from "./custom-error.js";

export default class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  getErrorMessage() {
    return { message: this.message };
  }
}