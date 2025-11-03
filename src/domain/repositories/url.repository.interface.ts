import type { UrlEntity, UrlStatus } from "../entities/url.entity"
import type { PaginatedResult } from "../../shared/types/pagination"

export interface IUrlRepository {
  create(data: { endereco: string; projetoId: string }): Promise<UrlEntity>
  findById(id: string): Promise<UrlEntity | null>
  findAll(page?: number, limit?: number): Promise<PaginatedResult<UrlEntity>>
  findByProjetoId(projetoId: string, page?: number, limit?: number): Promise<PaginatedResult<UrlEntity>>
  updateStatus(id: string, status: UrlStatus, erro?: string): Promise<UrlEntity>
  delete(id: string): Promise<void>
}
