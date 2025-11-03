import type { Request, Response, NextFunction } from "express"
import type { CreateProjetoUseCase } from "../../application/use-cases/projeto/create-projeto.use-case"
import type { ListProjetosUseCase } from "../../application/use-cases/projeto/list-projetos.use-case"
import type { GetProjetoUseCase } from "../../application/use-cases/projeto/get-projeto.use-case"
import type { UpdateProjetoUseCase } from "../../application/use-cases/projeto/update-projeto.use-case"
import type { DeleteProjetoUseCase } from "../../application/use-cases/projeto/delete-projeto.use-case"

export class ProjetoController {
  constructor(
    private readonly createProjetoUseCase: CreateProjetoUseCase,
    private readonly listProjetosUseCase: ListProjetosUseCase,
    private readonly getProjetoUseCase: GetProjetoUseCase,
    private readonly updateProjetoUseCase: UpdateProjetoUseCase,
    private readonly deleteProjetoUseCase: DeleteProjetoUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projeto = await this.createProjetoUseCase.execute(req.body)
      return res.status(201).json(projeto)
    } catch (error) {
      next(error)
    }
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const empresaId = req.query.empresaId as string | undefined
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.listProjetosUseCase.execute({ empresaId, page, limit })
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projeto = await this.getProjetoUseCase.execute(req.params.id)
      return res.status(200).json(projeto)
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projeto = await this.updateProjetoUseCase.execute(req.params.id, req.body)
      return res.status(200).json(projeto)
    } catch (error) {
      next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteProjetoUseCase.execute(req.params.id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
