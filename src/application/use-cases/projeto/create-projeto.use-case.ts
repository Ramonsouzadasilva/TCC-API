import type { IProjetoRepository } from "../../../domain/repositories/projeto.repository.interface"
import type { IEmpresaRepository } from "../../../domain/repositories/empresa.repository.interface"
import type { ProjetoEntity } from "../../../domain/entities/projeto.entity"
import type { CreateProjetoDto } from "../../dtos/projeto.dto"
import { NotFoundError } from "../../../shared/errors/app-error"

export class CreateProjetoUseCase {
  constructor(
    private readonly projetoRepository: IProjetoRepository,
    private readonly empresaRepository: IEmpresaRepository,
  ) {}

  async execute(data: CreateProjetoDto): Promise<ProjetoEntity> {
    const empresa = await this.empresaRepository.findById(data.empresaId)
    if (!empresa) {
      throw new NotFoundError("Empresa não encontrada")
    }

    return await this.projetoRepository.create(data)
  }
}
