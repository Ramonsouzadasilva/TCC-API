import type { IEmpresaRepository } from "../../../domain/repositories/empresa.repository.interface"
import type { EmpresaEntity } from "../../../domain/entities/empresa.entity"

export class ListEmpresasUseCase {
  constructor(private readonly empresaRepository: IEmpresaRepository) {}

  async execute(): Promise<EmpresaEntity[]> {
    return await this.empresaRepository.findAll()
  }
}
