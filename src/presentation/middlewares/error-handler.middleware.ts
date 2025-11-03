import type { Request, Response, NextFunction } from "express"
import { AppError } from "../../shared/errors/app-error"
import { ZodError } from "zod"

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  if (error instanceof ZodError) {
    return res.status(422).json({
      status: "error",
      message: "Erro de validação",
      errors: error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    })
  }

  console.error("[ERROR]", error)

  return res.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  })
}
