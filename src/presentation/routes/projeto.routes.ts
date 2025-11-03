import { Router } from "express"
import type { ProjetoController } from "../controllers/projeto.controller"
import { validateBody } from "../middlewares/validation.middleware"
import { CreateProjetoDtoSchema, UpdateProjetoDtoSchema } from "../../application/dtos/projeto.dto"
import { authMiddleware } from "../middlewares/auth.middleware"
import { managerMiddleware } from "../middlewares/manager.middleware"

export const createProjetoRoutes = (projetoController: ProjetoController) => {
  const router = Router()

  router.post("/", authMiddleware, managerMiddleware, validateBody(CreateProjetoDtoSchema), projetoController.create)
  router.get("/", authMiddleware, projetoController.list)
  router.get("/:id", authMiddleware, projetoController.getById)
  router.put("/:id", authMiddleware, managerMiddleware, validateBody(UpdateProjetoDtoSchema), projetoController.update)
  router.delete("/:id", authMiddleware, managerMiddleware, projetoController.delete)

  return router
}
