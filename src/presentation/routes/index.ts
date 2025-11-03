import { Router } from "express"
import { createEmpresaRoutes } from "./empresa.routes"
import { createFuncionarioRoutes } from "./funcionario.routes"
import { createProjetoRoutes } from "./projeto.routes"
import { createUrlRoutes } from "./url.routes"
import { createAuthRoutes } from "./auth.routes"
import type { EmpresaController } from "../controllers/empresa.controller"
import type { FuncionarioController } from "../controllers/funcionario.controller"
import type { ProjetoController } from "../controllers/projeto.controller"
import type { UrlController } from "../controllers/url.controller"
import type { AuthController } from "../controllers/auth.controller"

export const createRoutes = (
  empresaController: EmpresaController,
  funcionarioController: FuncionarioController,
  projetoController: ProjetoController,
  urlController: UrlController,
  authController: AuthController, // Added auth controller
) => {
  const router = Router()

  router.use("/auth", createAuthRoutes(authController))
  router.use("/empresas", createEmpresaRoutes(empresaController))
  router.use("/funcionarios", createFuncionarioRoutes(funcionarioController))
  router.use("/projetos", createProjetoRoutes(projetoController))
  router.use("/urls", createUrlRoutes(urlController))

  router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() })
  })

  return router
}
