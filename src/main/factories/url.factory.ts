import type { PrismaClient } from "@prisma/client"
import { UrlRepository } from "../../infrastructure/repositories/url.repository"
import { ProjetoRepository } from "../../infrastructure/repositories/projeto.repository"
import { CreateUrlUseCase } from "../../application/use-cases/url/create-url.use-case"
import { GetUrlUseCase } from "../../application/use-cases/url/get-url.use-case"
import { ListUrlsUseCase } from "../../application/use-cases/url/list-urls.use-case"
import { UpdateUrlStatusUseCase } from "../../application/use-cases/url/update-url-status.use-case"
import { DeleteUrlUseCase } from "../../application/use-cases/url/delete-url.use-case"
import { UrlController } from "../../presentation/controllers/url.controller"

export const makeUrlController = (prisma: PrismaClient): UrlController => {
  const urlRepository = new UrlRepository(prisma)
  const projetoRepository = new ProjetoRepository(prisma)

  const createUrlUseCase = new CreateUrlUseCase(urlRepository, projetoRepository)
  const getUrlUseCase = new GetUrlUseCase(urlRepository)
  const listUrlsUseCase = new ListUrlsUseCase(urlRepository)
  const updateUrlStatusUseCase = new UpdateUrlStatusUseCase(urlRepository)
  const deleteUrlUseCase = new DeleteUrlUseCase(urlRepository)

  return new UrlController(createUrlUseCase, listUrlsUseCase, getUrlUseCase, updateUrlStatusUseCase, deleteUrlUseCase)
}
