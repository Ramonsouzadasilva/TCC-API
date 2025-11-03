import type { Request, Response, NextFunction } from "express"
import type { ZodSchema } from "zod"
import { ZodValidator } from "../../shared/validators/zod-validator"

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = ZodValidator.validate(schema, req.body)
      next()
    } catch (error) {
      next(error)
    }
  }
}

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = ZodValidator.validate(schema, req.params)
      next()
    } catch (error) {
      next(error)
    }
  }
}

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = ZodValidator.validate(schema, req.query)
      next()
    } catch (error) {
      next(error)
    }
  }
}
