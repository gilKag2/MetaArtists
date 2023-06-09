import { CustomError } from "../errors/custom-error.js";

export const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send(error.getErrorMessage());
  }

  res.status(500).send({ message: "something went wrong" });
};
