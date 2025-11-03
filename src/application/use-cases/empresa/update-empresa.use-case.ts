import type { IEmpresaRepository } from "../../../domain/repositories/empresa.repository.interface"
import type { EmpresaEntity } from "../../../domain/entities/empresa.entity"
import type { UpdateEmpresaDto } from "../../dtos/empresa.dto"
import { NotFoundError } from "../../../shared/errors/app-error"

export class UpdateEmpresaUseCase {
  constructor(private readonly empresaRepository: IEmpresaRepository) {}

  async execute(id: string, data: UpdateEmpresaDto): Promise<EmpresaEntity> {
    const empresa = await this.empresaRepository.findById(id)

    if (!empresa) {
      throw new NotFoundError("Empresa não encontrada")
    }

    return await this.empresaRepository.update(id, data)
  }
}
