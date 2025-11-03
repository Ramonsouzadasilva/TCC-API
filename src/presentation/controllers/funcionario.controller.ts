import type { Request, Response, NextFunction } from "express"
import type { CreateFuncionarioUseCase } from "../../application/use-cases/funcionario/create-funcionario.use-case"
import type { GetFuncionarioUseCase } from "../../application/use-cases/funcionario/get-funcionario.use-case"
import type { ListFuncionariosUseCase } from "../../application/use-cases/funcionario/list-funcionarios.use-case"
import type { UpdateFuncionarioUseCase } from "../../application/use-cases/funcionario/update-funcionario.use-case"
import type { DeleteFuncionarioUseCase } from "../../application/use-cases/funcionario/delete-funcionario.use-case"

export class FuncionarioController {
  constructor(
    private readonly createFuncionarioUseCase: CreateFuncionarioUseCase,
    private readonly getFuncionarioUseCase: GetFuncionarioUseCase,
    private readonly listFuncionariosUseCase: ListFuncionariosUseCase,
    private readonly updateFuncionarioUseCase: UpdateFuncionarioUseCase,
    private readonly deleteFuncionarioUseCase: DeleteFuncionarioUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const funcionario = await this.createFuncionarioUseCase.execute(req.body)
      return res.status(201).json(funcionario)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const funcionario = await this.getFuncionarioUseCase.execute(req.params.id)
      return res.status(200).json(funcionario)
    } catch (error) {
      next(error)
    }
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const empresaId = req.query.empresaId as string | undefined
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.listFuncionariosUseCase.execute({ empresaId, page, limit })
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const funcionario = await this.updateFuncionarioUseCase.execute(req.params.id, req.body)
      return res.status(200).json(funcionario)
    } catch (error) {
      next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteFuncionarioUseCase.execute(req.params.id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
