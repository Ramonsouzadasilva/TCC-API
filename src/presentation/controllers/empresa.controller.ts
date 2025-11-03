import type { Request, Response, NextFunction } from "express"
import type { CreateEmpresaUseCase } from "../../application/use-cases/empresa/create-empresa.use-case"
import type { GetEmpresaUseCase } from "../../application/use-cases/empresa/get-empresa.use-case"
import type { ListEmpresasUseCase } from "../../application/use-cases/empresa/list-empresas.use-case"
import type { UpdateEmpresaUseCase } from "../../application/use-cases/empresa/update-empresa.use-case"
import type { DeleteEmpresaUseCase } from "../../application/use-cases/empresa/delete-empresa.use-case"

export class EmpresaController {
  constructor(
    private readonly createEmpresaUseCase: CreateEmpresaUseCase,
    private readonly getEmpresaUseCase: GetEmpresaUseCase,
    private readonly listEmpresasUseCase: ListEmpresasUseCase,
    private readonly updateEmpresaUseCase: UpdateEmpresaUseCase,
    private readonly deleteEmpresaUseCase: DeleteEmpresaUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const empresa = await this.createEmpresaUseCase.execute(req.body)
      return res.status(201).json(empresa)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const empresa = await this.getEmpresaUseCase.execute(req.params.id)
      return res.status(200).json(empresa)
    } catch (error) {
      next(error)
    }
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const empresas = await this.listEmpresasUseCase.execute()
      return res.status(200).json(empresas)
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const empresa = await this.updateEmpresaUseCase.execute(req.params.id, req.body)
      return res.status(200).json(empresa)
    } catch (error) {
      next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteEmpresaUseCase.execute(req.params.id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
