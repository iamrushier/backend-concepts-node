import type { Request, Response, NextFunction } from "express";
import type { ZodType as ZodSchema } from "zod";

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return res.status(400).json({
        error: "Invalid request data",
        details: errors,
      });
    }
    req.body = result.data;
    next();
  };
}
