import type { PrismaClient } from "@prisma/client"
import { FuncionarioRepository } from "../../infrastructure/repositories/funcionario.repository"
import { LoginUseCase } from "../../application/use-cases/auth/login.use-case"
import { AuthController } from "../../presentation/controllers/auth.controller"
import { HashService } from "../../shared/services/hash.service"
import { JwtService } from "../../shared/services/jwt.service"

export const makeAuthController = (prisma: PrismaClient): AuthController => {
  const funcionarioRepository = new FuncionarioRepository(prisma)
  const hashService = new HashService()
  const jwtService = new JwtService()

  const loginUseCase = new LoginUseCase(funcionarioRepository, hashService, jwtService)

  return new AuthController(loginUseCase)
}
