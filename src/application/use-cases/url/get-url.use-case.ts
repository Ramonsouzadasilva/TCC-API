import type { IUrlRepository } from "../../../domain/repositories/url.repository.interface"
import type { UrlEntity } from "../../../domain/entities/url.entity"
import { NotFoundError } from "../../../shared/errors/app-error"

export class GetUrlUseCase {
  constructor(private readonly urlRepository: IUrlRepository) {}

  async execute(id: string): Promise<UrlEntity> {
    const url = await this.urlRepository.findById(id)
    if (!url) {
      throw new NotFoundError("URL não encontrada")
    }
    return url
  }
}
