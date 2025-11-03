import { type ZodSchema, ZodError } from "zod"
import { ValidationError } from "../errors/app-error"

export class ZodValidator {
  static validate<T>(schema: ZodSchema<T>, data: unknown): T {
    try {
      return schema.parse(data)
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`)
        throw new ValidationError(messages.join(", "))
      }
      throw error
    }
  }

  static validateAsync<T>(schema: ZodSchema<T>, data: unknown): Promise<T> {
    return schema.parseAsync(data).catch((error) => {
      if (error instanceof ZodError) {
        const messages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`)
        throw new ValidationError(messages.join(", "))
      }
      throw error
    })
  }
}
