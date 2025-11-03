import type { IProjetoRepository } from "../../../domain/repositories/projeto.repository.interface"
import type { ProjetoEntity } from "../../../domain/entities/projeto.entity"
import { NotFoundError } from "../../../shared/errors/app-error"

export class GetProjetoUseCase {
  constructor(private readonly projetoRepository: IProjetoRepository) {}

  async execute(id: string): Promise<ProjetoEntity> {
    const projeto = await this.projetoRepository.findById(id)
    if (!projeto) {
      throw new NotFoundError("Projeto não encontrado")
    }
    return projeto
  }
}
