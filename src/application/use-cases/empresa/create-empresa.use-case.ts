import type { IEmpresaRepository } from "../../../domain/repositories/empresa.repository.interface"
import type { EmpresaEntity } from "../../../domain/entities/empresa.entity"
import type { CreateEmpresaDto } from "../../dtos/empresa.dto"

export class CreateEmpresaUseCase {
  constructor(private readonly empresaRepository: IEmpresaRepository) {}

  async execute(data: CreateEmpresaDto): Promise<EmpresaEntity> {
    return await this.empresaRepository.create(data)
  }
}
