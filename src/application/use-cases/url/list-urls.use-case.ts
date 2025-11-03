import type { IUrlRepository } from "../../../domain/repositories/url.repository.interface"
import type { UrlEntity } from "../../../domain/entities/url.entity"
import type { PaginatedResult } from "../../../shared/types/pagination"

export class ListUrlsUseCase {
  constructor(private readonly urlRepository: IUrlRepository) {}

  async execute(params: {
    projetoId?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResult<UrlEntity>> {
    const page = params.page || 1
    const limit = params.limit || 10

    if (params.projetoId) {
      return await this.urlRepository.findByProjetoId(params.projetoId, page, limit)
    }

    return await this.urlRepository.findAll(page, limit)
  }
}
