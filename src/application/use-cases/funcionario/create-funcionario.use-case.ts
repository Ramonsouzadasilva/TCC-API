import type { IFuncionarioRepository } from "../../../domain/repositories/funcionario.repository.interface"
import type { IEmpresaRepository } from "../../../domain/repositories/empresa.repository.interface"
import type { FuncionarioEntity } from "../../../domain/entities/funcionario.entity"
import type { CreateFuncionarioDto } from "../../dtos/funcionario.dto"
import { NotFoundError, ConflictError } from "../../../shared/errors/app-error"
import type { HashService } from "../../../shared/services/hash.service"

export class CreateFuncionarioUseCase {
  constructor(
    private readonly funcionarioRepository: IFuncionarioRepository,
    private readonly empresaRepository: IEmpresaRepository,
    private readonly hashService: HashService,
  ) {}

  async execute(data: CreateFuncionarioDto): Promise<FuncionarioEntity> {
    const empresa = await this.empresaRepository.findById(data.empresaId)
    if (!empresa) {
      throw new NotFoundError("Empresa não encontrada")
    }

    const existingFuncionario = await this.funcionarioRepository.findByEmail(data.email)
    if (existingFuncionario) {
      throw new ConflictError("Email já cadastrado")
    }

    const hashedPassword = await this.hashService.hash(data.senha)

    return await this.funcionarioRepository.create({
      ...data,
      senha: hashedPassword,
    })
  }
}
