import type { IUrlRepository } from "../../../domain/repositories/url.repository.interface"
import type { IProjetoRepository } from "../../../domain/repositories/projeto.repository.interface"
import type { UrlEntity } from "../../../domain/entities/url.entity"
import type { CreateUrlDto } from "../../dtos/url.dto"
import { NotFoundError } from "../../../shared/errors/app-error"

export class CreateUrlUseCase {
  constructor(
    private readonly urlRepository: IUrlRepository,
    private readonly projetoRepository: IProjetoRepository,
  ) {}

  async execute(data: CreateUrlDto): Promise<UrlEntity> {
    const projeto = await this.projetoRepository.findById(data.projetoId)
    if (!projeto) {
      throw new NotFoundError("Projeto não encontrado")
    }

    return await this.urlRepository.create(data)
  }
}
