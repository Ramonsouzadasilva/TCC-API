import type { IFuncionarioRepository } from "../../../domain/repositories/funcionario.repository.interface"
import type { FuncionarioEntity } from "../../../domain/entities/funcionario.entity"
import type { PaginatedResult } from "../../../shared/types/pagination"

export class ListFuncionariosUseCase {
  constructor(private readonly funcionarioRepository: IFuncionarioRepository) {}

  async execute(params: {
    empresaId?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResult<FuncionarioEntity>> {
    const page = params.page || 1
    const limit = params.limit || 10

    return await this.funcionarioRepository.findAll(params.empresaId, page, limit)
  }
}
