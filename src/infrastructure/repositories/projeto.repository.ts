import type { PrismaClient } from "@prisma/client"
import type { IProjetoRepository } from "../../domain/repositories/projeto.repository.interface"
import { ProjetoEntity } from "../../domain/entities/projeto.entity"
import type { PaginatedResult } from "../../shared/types/pagination"

export class ProjetoRepository implements IProjetoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: {
    nome: string
    descricao?: string
    empresaId: string
  }): Promise<ProjetoEntity> {
    const projeto = await this.prisma.projeto.create({
      data,
    })

    return ProjetoEntity.create(projeto)
  }

  async findById(id: string): Promise<ProjetoEntity | null> {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id },
    })

    return projeto ? ProjetoEntity.create(projeto) : null
  }

  async findAll(page = 1, limit = 10): Promise<PaginatedResult<ProjetoEntity>> {
    const skip = (page - 1) * limit

    const [projetos, total] = await Promise.all([
      this.prisma.projeto.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.projeto.count(),
    ])

    return {
      data: projetos.map((p) => ProjetoEntity.create(p)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findByEmpresaId(empresaId: string, page = 1, limit = 10): Promise<PaginatedResult<ProjetoEntity>> {
    const skip = (page - 1) * limit

    const [projetos, total] = await Promise.all([
      this.prisma.projeto.findMany({
        where: { empresaId },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.projeto.count({ where: { empresaId } }),
    ])

    return {
      data: projetos.map((p) => ProjetoEntity.create(p)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async update(id: string, data: { nome?: string; descricao?: string }): Promise<ProjetoEntity> {
    const projeto = await this.prisma.projeto.update({
      where: { id },
      data,
    })

    return ProjetoEntity.create(projeto)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.projeto.delete({
      where: { id },
    })
  }
}
