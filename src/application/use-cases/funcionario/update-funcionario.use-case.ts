import type { IFuncionarioRepository } from "../../../domain/repositories/funcionario.repository.interface"
import type { FuncionarioEntity } from "../../../domain/entities/funcionario.entity"
import type { UpdateFuncionarioDto } from "../../dtos/funcionario.dto"
import { NotFoundError } from "../../../shared/errors/app-error"
import type { HashService } from "../../../shared/services/hash.service"

export class UpdateFuncionarioUseCase {
  constructor(
    private readonly funcionarioRepository: IFuncionarioRepository,
    private readonly hashService: HashService,
  ) {}

  async execute(id: string, data: UpdateFuncionarioDto): Promise<FuncionarioEntity> {
    const funcionario = await this.funcionarioRepository.findById(id)
    if (!funcionario) {
      throw new NotFoundError("Funcionário não encontrado")
    }

    const updateData = { ...data }

    if (data.senha) {
      updateData.senha = await this.hashService.hash(data.senha)
    }

    return await this.funcionarioRepository.update(id, updateData)
  }
}
