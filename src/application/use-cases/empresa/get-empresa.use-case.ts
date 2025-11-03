import type { IEmpresaRepository } from "../../../domain/repositories/empresa.repository.interface"
import type { EmpresaEntity } from "../../../domain/entities/empresa.entity"
import { NotFoundError } from "../../../shared/errors/app-error"

export class GetEmpresaUseCase {
  constructor(private readonly empresaRepository: IEmpresaRepository) {}

  async execute(id: string): Promise<EmpresaEntity> {
    const empresa = await this.empresaRepository.findById(id)

    if (!empresa) {
      throw new NotFoundError("Empresa não encontrada")
    }

    return empresa
  }
}
