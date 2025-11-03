import { Router } from "express"
import type { AuthController } from "../controllers/auth.controller"
import { validateBody } from "../middlewares/validation.middleware"
import { LoginDtoSchema } from "../../application/dtos/auth.dto"

export const createAuthRoutes = (authController: AuthController) => {
  const router = Router()

  router.post("/login", validateBody(LoginDtoSchema), authController.login)

  return router
}
