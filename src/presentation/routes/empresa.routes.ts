import { Router } from "express"
import type { EmpresaController } from "../controllers/empresa.controller"
import { validateBody } from "../middlewares/validation.middleware"
import { CreateEmpresaDtoSchema, UpdateEmpresaDtoSchema } from "../../application/dtos/empresa.dto"

export const createEmpresaRoutes = (empresaController: EmpresaController) => {
  const router = Router()

  router.post("/", validateBody(CreateEmpresaDtoSchema), empresaController.create)
  router.get("/", empresaController.list)
  router.get("/:id", empresaController.getById)
  router.put("/:id", validateBody(UpdateEmpresaDtoSchema), empresaController.update)
  router.delete("/:id", empresaController.delete)

  return router
}
