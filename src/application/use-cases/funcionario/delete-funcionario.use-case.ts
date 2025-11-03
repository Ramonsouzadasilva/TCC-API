import type { IFuncionarioRepository } from "../../../domain/repositories/funcionario.repository.interface"
import { NotFoundError } from "../../../shared/errors/app-error"

export class DeleteFuncionarioUseCase {
  constructor(private readonly funcionarioRepository: IFuncionarioRepository) {}

  async execute(id: string): Promise<void> {
    const funcionario = await this.funcionarioRepository.findById(id)
    if (!funcionario) {
      throw new NotFoundError("Funcionário não encontrado")
    }

    await this.funcionarioRepository.delete(id)
  }
}
