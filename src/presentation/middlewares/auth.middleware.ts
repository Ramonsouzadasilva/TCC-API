import type { Request, Response, NextFunction } from "express"
import { JwtService } from "../../shared/services/jwt.service"
import { UnauthorizedError } from "../../shared/errors/app-error"

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    tipo: string
  }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedError("Token não fornecido")
    }

    const [, token] = authHeader.split(" ")

    if (!token) {
      throw new UnauthorizedError("Token inválido")
    }

    const jwtService = new JwtService()
    const decoded = jwtService.verify(token)

    req.user = decoded

    next()
  } catch (error) {
    next(new UnauthorizedError("Token inválido ou expirado"))
  }
}
