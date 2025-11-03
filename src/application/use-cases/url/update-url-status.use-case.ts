import type { IUrlRepository } from "../../../domain/repositories/url.repository.interface"
import type { UrlEntity, UrlStatus } from "../../../domain/entities/url.entity"
import { NotFoundError } from "../../../shared/errors/app-error"

export class UpdateUrlStatusUseCase {
  constructor(private readonly urlRepository: IUrlRepository) {}

  async execute(id: string, status: UrlStatus, erro?: string): Promise<UrlEntity> {
    const url = await this.urlRepository.findById(id)
    if (!url) {
      throw new NotFoundError("URL não encontrada")
    }

    return await this.urlRepository.updateStatus(id, status, erro)
  }
}
