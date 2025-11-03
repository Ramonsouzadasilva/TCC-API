import type { ProjetoEntity } from "../entities/projeto.entity"
import type { PaginatedResult } from "../../shared/types/pagination"

export interface IProjetoRepository {
  create(data: {
    nome: string
    descricao?: string
    empresaId: string
  }): Promise<ProjetoEntity>
  findById(id: string): Promise<ProjetoEntity | null>
  findAll(page?: number, limit?: number): Promise<PaginatedResult<ProjetoEntity>>
  findByEmpresaId(empresaId: string, page?: number, limit?: number): Promise<PaginatedResult<ProjetoEntity>>
  update(id: string, data: { nome?: string; descricao?: string }): Promise<ProjetoEntity>
  delete(id: string): Promise<void>
}
