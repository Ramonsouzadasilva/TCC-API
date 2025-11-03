import { Router } from "express"
import type { UrlController } from "../controllers/url.controller"
import { validateBody } from "../middlewares/validation.middleware"
import { CreateUrlDtoSchema, UpdateUrlStatusDtoSchema } from "../../application/dtos/url.dto"
import { authMiddleware } from "../middlewares/auth.middleware"
import { managerMiddleware } from "../middlewares/manager.middleware"

export const createUrlRoutes = (urlController: UrlController) => {
  const router = Router()

  router.post("/", authMiddleware, validateBody(CreateUrlDtoSchema), urlController.create)
  router.get("/", authMiddleware, urlController.list)
  router.get("/:id", authMiddleware, urlController.getById)
  router.patch(
    "/:id/status",
    authMiddleware,
    managerMiddleware,
    validateBody(UpdateUrlStatusDtoSchema),
    urlController.updateStatus,
  )
  router.delete("/:id", authMiddleware, managerMiddleware, urlController.delete)

  return router
}
