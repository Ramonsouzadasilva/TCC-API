import { AppError } from "../../../shared/errors/app-error"
import type { HashService } from "../../../shared/services/hash.service"
import type { JwtService } from "../../../shared/services/jwt.service"
import type { IFuncionarioRepository } from "../../../domain/repositories/funcionario.repository.interface"

export interface LoginResponse {
  token: string
  funcionario: {
    id: string
    nome: string
    email: string
    tipo: string
  }
}

export class LoginUseCase {
  constructor(
    private readonly funcionarioRepository: IFuncionarioRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: { email: string; senha: string }): Promise<LoginResponse> {
    const { email, senha } = data

    const funcionario = await this.funcionarioRepository.findByEmail(email)

    if (!funcionario) {
      throw new AppError("Credenciais inválidas", 401)
    }

    const isPasswordValid = await this.hashService.compare(senha, funcionario.senha)

    if (!isPasswordValid) {
      throw new AppError("Credenciais inválidas", 401)
    }

    const token = this.jwtService.sign({
      funcionarioId: funcionario.id,
      email: funcionario.email,
      tipo: funcionario.tipo,
    })

    return {
      token,
      funcionario: {
        id: funcionario.id,
        nome: funcionario.nome,
        email: funcionario.email,
        tipo: funcionario.tipo,
      },
    }
  }
}
