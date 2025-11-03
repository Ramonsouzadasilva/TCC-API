import type { FuncionarioEntity, TipoFuncionario } from "../entities/funcionario.entity"
import type { PaginatedResult } from "../../shared/types/pagination"

export interface IFuncionarioRepository {
  create(data: {
    nome: string
    email: string
    senha: string
    cargo?: string
    tipo: TipoFuncionario
    empresaId: string
  }): Promise<FuncionarioEntity>
  findById(id: string): Promise<FuncionarioEntity | null>
  findByEmail(email: string): Promise<FuncionarioEntity | null>
  findAll(page?: number, limit?: number): Promise<PaginatedResult<FuncionarioEntity>>
  findByEmpresaId(empresaId: string, page?: number, limit?: number): Promise<PaginatedResult<FuncionarioEntity>>
  update(
    id: string,
    data: { nome?: string; email?: string; senha?: string; cargo?: string; tipo?: TipoFuncionario },
  ): Promise<FuncionarioEntity>
  delete(id: string): Promise<void>
}
