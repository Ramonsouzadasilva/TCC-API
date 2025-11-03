import type { IProjetoRepository } from "../../../domain/repositories/projeto.repository.interface"
import type { ProjetoEntity } from "../../../domain/entities/projeto.entity"
import type { PaginatedResult } from "../../../shared/types/pagination"

export class ListProjetosUseCase {
  constructor(private readonly projetoRepository: IProjetoRepository) {}

  async execute(params: {
    empresaId?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResult<ProjetoEntity>> {
    const page = params.page || 1
    const limit = params.limit || 10

    if (params.empresaId) {
      return await this.projetoRepository.findByEmpresaId(params.empresaId, page, limit)
    }

    return await this.projetoRepository.findAll(page, limit)
  }
}
