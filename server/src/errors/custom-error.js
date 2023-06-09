export class CustomError extends Error {
  statusCode;

  constructor(message) {
    if (this.constructor === CustomError) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getErrorMessage() {
    throw new Error("Method 'getError' must be implemented.");
  }
}
