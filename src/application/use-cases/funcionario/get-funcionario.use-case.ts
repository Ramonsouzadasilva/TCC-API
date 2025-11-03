import type { IFuncionarioRepository } from "../../../domain/repositories/funcionario.repository.interface"
import type { FuncionarioEntity } from "../../../domain/entities/funcionario.entity"
import { NotFoundError } from "../../../shared/errors/app-error"

export class GetFuncionarioUseCase {
  constructor(private readonly funcionarioRepository: IFuncionarioRepository) {}

  async execute(id: string): Promise<FuncionarioEntity> {
    const funcionario = await this.funcionarioRepository.findById(id)

    if (!funcionario) {
      throw new NotFoundError("Funcionário não encontrado")
    }

    return funcionario
  }
}
