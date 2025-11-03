import type { IProjetoRepository } from "../../../domain/repositories/projeto.repository.interface"
import { NotFoundError } from "../../../shared/errors/app-error"

export class DeleteProjetoUseCase {
  constructor(private readonly projetoRepository: IProjetoRepository) {}

  async execute(id: string): Promise<void> {
    const projeto = await this.projetoRepository.findById(id)
    if (!projeto) {
      throw new NotFoundError("Projeto não encontrado")
    }

    await this.projetoRepository.delete(id)
  }
}
