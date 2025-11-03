import type { IEmpresaRepository } from "../../../domain/repositories/empresa.repository.interface"
import { NotFoundError } from "../../../shared/errors/app-error"

export class DeleteEmpresaUseCase {
  constructor(private readonly empresaRepository: IEmpresaRepository) {}

  async execute(id: string): Promise<void> {
    const empresa = await this.empresaRepository.findById(id)

    if (!empresa) {
      throw new NotFoundError("Empresa não encontrada")
    }

    await this.empresaRepository.delete(id)
  }
}
