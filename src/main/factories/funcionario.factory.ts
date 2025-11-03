import type { PrismaClient } from "@prisma/client"
import { FuncionarioRepository } from "../../infrastructure/repositories/funcionario.repository"
import { EmpresaRepository } from "../../infrastructure/repositories/empresa.repository"
import { CreateFuncionarioUseCase } from "../../application/use-cases/funcionario/create-funcionario.use-case"
import { GetFuncionarioUseCase } from "../../application/use-cases/funcionario/get-funcionario.use-case"
import { ListFuncionariosUseCase } from "../../application/use-cases/funcionario/list-funcionarios.use-case"
import { UpdateFuncionarioUseCase } from "../../application/use-cases/funcionario/update-funcionario.use-case"
import { DeleteFuncionarioUseCase } from "../../application/use-cases/funcionario/delete-funcionario.use-case"
import { FuncionarioController } from "../../presentation/controllers/funcionario.controller"
import { HashService } from "../../shared/services/hash.service"

export const makeFuncionarioController = (prisma: PrismaClient): FuncionarioController => {
  const funcionarioRepository = new FuncionarioRepository(prisma)
  const empresaRepository = new EmpresaRepository(prisma)
  const hashService = new HashService()

  const createFuncionarioUseCase = new CreateFuncionarioUseCase(funcionarioRepository, empresaRepository, hashService)
  const getFuncionarioUseCase = new GetFuncionarioUseCase(funcionarioRepository)
  const listFuncionariosUseCase = new ListFuncionariosUseCase(funcionarioRepository)
  const updateFuncionarioUseCase = new UpdateFuncionarioUseCase(funcionarioRepository, hashService)
  const deleteFuncionarioUseCase = new DeleteFuncionarioUseCase(funcionarioRepository)

  return new FuncionarioController(
    createFuncionarioUseCase,
    getFuncionarioUseCase,
    listFuncionariosUseCase,
    updateFuncionarioUseCase,
    deleteFuncionarioUseCase,
  )
}
