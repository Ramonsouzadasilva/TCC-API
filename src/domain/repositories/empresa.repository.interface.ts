import type { EmpresaEntity } from "../entities/empresa.entity"

export interface IEmpresaRepository {
  create(data: { nome: string; cnpj?: string }): Promise<EmpresaEntity>
  findById(id: string): Promise<EmpresaEntity | null>
  findAll(): Promise<EmpresaEntity[]>
  update(id: string, data: { nome?: string; cnpj?: string }): Promise<EmpresaEntity>
  delete(id: string): Promise<void>
}
