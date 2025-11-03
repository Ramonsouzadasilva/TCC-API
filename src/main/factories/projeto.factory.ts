import type { PrismaClient } from "@prisma/client"
import { ProjetoRepository } from "../../infrastructure/repositories/projeto.repository"
import { EmpresaRepository } from "../../infrastructure/repositories/empresa.repository"
import { CreateProjetoUseCase } from "../../application/use-cases/projeto/create-projeto.use-case"
import { GetProjetoUseCase } from "../../application/use-cases/projeto/get-projeto.use-case"
import { ListProjetosUseCase } from "../../application/use-cases/projeto/list-projetos.use-case"
import { UpdateProjetoUseCase } from "../../application/use-cases/projeto/update-projeto.use-case"
import { DeleteProjetoUseCase } from "../../application/use-cases/projeto/delete-projeto.use-case"
import { ProjetoController } from "../../presentation/controllers/projeto.controller"

export const makeProjetoController = (prisma: PrismaClient): ProjetoController => {
  const projetoRepository = new ProjetoRepository(prisma)
  const empresaRepository = new EmpresaRepository(prisma)

  const createProjetoUseCase = new CreateProjetoUseCase(projetoRepository, empresaRepository)
  const getProjetoUseCase = new GetProjetoUseCase(projetoRepository)
  const listProjetosUseCase = new ListProjetosUseCase(projetoRepository)
  const updateProjetoUseCase = new UpdateProjetoUseCase(projetoRepository)
  const deleteProjetoUseCase = new DeleteProjetoUseCase(projetoRepository)

  return new ProjetoController(
    createProjetoUseCase,
    listProjetosUseCase,
    getProjetoUseCase,
    updateProjetoUseCase,
    deleteProjetoUseCase,
  )
}
