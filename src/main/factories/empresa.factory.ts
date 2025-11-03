import type { PrismaClient } from "@prisma/client"
import { EmpresaRepository } from "../../infrastructure/repositories/empresa.repository"
import { CreateEmpresaUseCase } from "../../application/use-cases/empresa/create-empresa.use-case"
import { GetEmpresaUseCase } from "../../application/use-cases/empresa/get-empresa.use-case"
import { ListEmpresasUseCase } from "../../application/use-cases/empresa/list-empresas.use-case"
import { UpdateEmpresaUseCase } from "../../application/use-cases/empresa/update-empresa.use-case"
import { DeleteEmpresaUseCase } from "../../application/use-cases/empresa/delete-empresa.use-case"
import { EmpresaController } from "../../presentation/controllers/empresa.controller"

export const makeEmpresaController = (prisma: PrismaClient): EmpresaController => {
  const empresaRepository = new EmpresaRepository(prisma)

  const createEmpresaUseCase = new CreateEmpresaUseCase(empresaRepository)
  const getEmpresaUseCase = new GetEmpresaUseCase(empresaRepository)
  const listEmpresasUseCase = new ListEmpresasUseCase(empresaRepository)
  const updateEmpresaUseCase = new UpdateEmpresaUseCase(empresaRepository)
  const deleteEmpresaUseCase = new DeleteEmpresaUseCase(empresaRepository)

  return new EmpresaController(
    createEmpresaUseCase,
    getEmpresaUseCase,
    listEmpresasUseCase,
    updateEmpresaUseCase,
    deleteEmpresaUseCase,
  )
}
