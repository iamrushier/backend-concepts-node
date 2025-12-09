import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.ts";

export const demoController = {
  hello(req: Request, res: Response) {
    res.json({ message: "Hello! Error system working!" });
  },

  causeAppError(req: Request, res: Response, next: NextFunction) {
    next(new AppError("This is controlled AppError", 400));
  },

  causeCrash(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const x = testVar;
    res.json(x);
  },
};
