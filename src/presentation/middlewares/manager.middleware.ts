import type { Response, NextFunction } from "express"
import type { AuthRequest } from "./auth.middleware"
import { ForbiddenError } from "../../shared/errors/app-error"

export const managerMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new ForbiddenError("Usuário não autenticado")
    }

    if (req.user.tipo !== "GERENTE") {
      throw new ForbiddenError("Apenas gerentes podem realizar esta ação")
    }

    next()
  } catch (error) {
    next(error)
  }
}
