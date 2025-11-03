import type { Request, Response, NextFunction } from "express"
import type { CreateUrlUseCase } from "../../application/use-cases/url/create-url.use-case"
import type { ListUrlsUseCase } from "../../application/use-cases/url/list-urls.use-case"
import type { GetUrlUseCase } from "../../application/use-cases/url/get-url.use-case"
import type { UpdateUrlStatusUseCase } from "../../application/use-cases/url/update-url-status.use-case"
import type { DeleteUrlUseCase } from "../../application/use-cases/url/delete-url.use-case"

export class UrlController {
  constructor(
    private readonly createUrlUseCase: CreateUrlUseCase,
    private readonly listUrlsUseCase: ListUrlsUseCase,
    private readonly getUrlUseCase: GetUrlUseCase,
    private readonly updateUrlStatusUseCase: UpdateUrlStatusUseCase,
    private readonly deleteUrlUseCase: DeleteUrlUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = await this.createUrlUseCase.execute(req.body)
      return res.status(201).json(url)
    } catch (error) {
      next(error)
    }
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projetoId = req.query.projetoId as string | undefined
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.listUrlsUseCase.execute({ projetoId, page, limit })
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = await this.getUrlUseCase.execute(req.params.id)
      return res.status(200).json(url)
    } catch (error) {
      next(error)
    }
  }

  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = await this.updateUrlStatusUseCase.execute(req.params.id, req.body)
      return res.status(200).json(url)
    } catch (error) {
      next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteUrlUseCase.execute(req.params.id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
