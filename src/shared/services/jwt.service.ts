import jwt from "jsonwebtoken"
import { env } from "../../main/config/env"

export interface JwtPayload {
  funcionarioId: string
  email: string
  tipo: string
}

export class JwtService {
  private readonly secret: string
  private readonly expiresIn: string

  constructor() {
    this.secret = env.JWT_SECRET
    this.expiresIn = env.JWT_EXPIRES_IN || "7d"
  }

  sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
  }

  verify(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secret) as JwtPayload
    } catch (error) {
      throw new Error("Token inválido ou expirado")
    }
  }
}
