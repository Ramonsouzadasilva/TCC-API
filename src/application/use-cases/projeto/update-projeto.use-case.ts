import type { IProjetoRepository } from "../../../domain/repositories/projeto.repository.interface"
import type { ProjetoEntity } from "../../../domain/entities/projeto.entity"
import type { UpdateProjetoDto } from "../../dtos/projeto.dto"
import { NotFoundError } from "../../../shared/errors/app-error"

export class UpdateProjetoUseCase {
  constructor(private readonly projetoRepository: IProjetoRepository) {}

  async execute(id: string, data: UpdateProjetoDto): Promise<ProjetoEntity> {
    const projeto = await this.projetoRepository.findById(id)
    if (!projeto) {
      throw new NotFoundError("Projeto não encontrado")
    }

    return await this.projetoRepository.update(id, data)
  }
}
