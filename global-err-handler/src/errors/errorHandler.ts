import type { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError.ts";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(err instanceof AppError)) {
    console.error("UNEXPECTED ERROR", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
  res.status(err.statusCode).json({
    status: "fail",
    message: err.message,
  });
}
