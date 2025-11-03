import type { PrismaClient } from "@prisma/client"
import type { IUrlRepository } from "../../domain/repositories/url.repository.interface"
import { UrlEntity, type UrlStatus } from "../../domain/entities/url.entity"
import type { PaginatedResult } from "../../shared/types/pagination"

export class UrlRepository implements IUrlRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: { endereco: string; projetoId: string }): Promise<UrlEntity> {
    const url = await this.prisma.uRL.create({
      data,
    })

    return UrlEntity.create({
      id: url.id,
      endereco: url.endereco,
      status: url.status as UrlStatus,
      testadoEm: url.testadoEm,
      erro: url.erro,
      projetoId: url.projetoId,
    })
  }

  async findById(id: string): Promise<UrlEntity | null> {
    const url = await this.prisma.uRL.findUnique({
      where: { id },
    })

    return url
      ? UrlEntity.create({
          id: url.id,
          endereco: url.endereco,
          status: url.status as UrlStatus,
          testadoEm: url.testadoEm,
          erro: url.erro,
          projetoId: url.projetoId,
        })
      : null
  }

  async findByProjetoId(projetoId: string, page = 1, limit = 10): Promise<PaginatedResult<UrlEntity>> {
    const skip = (page - 1) * limit

    const [urls, total] = await Promise.all([
      this.prisma.uRL.findMany({
        where: { projetoId },
        skip,
        take: limit,
        orderBy: { testadoEm: "desc" },
      }),
      this.prisma.uRL.count({ where: { projetoId } }),
    ])

    return {
      data: urls.map((url) =>
        UrlEntity.create({
          id: url.id,
          endereco: url.endereco,
          status: url.status as UrlStatus,
          testadoEm: url.testadoEm,
          erro: url.erro,
          projetoId: url.projetoId,
        }),
      ),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findAll(page = 1, limit = 10): Promise<PaginatedResult<UrlEntity>> {
    const skip = (page - 1) * limit

    const [urls, total] = await Promise.all([
      this.prisma.uRL.findMany({
        skip,
        take: limit,
        orderBy: { testadoEm: "desc" },
      }),
      this.prisma.uRL.count(),
    ])

    return {
      data: urls.map((url) =>
        UrlEntity.create({
          id: url.id,
          endereco: url.endereco,
          status: url.status as UrlStatus,
          testadoEm: url.testadoEm,
          erro: url.erro,
          projetoId: url.projetoId,
        }),
      ),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async updateStatus(id: string, status: UrlStatus, erro?: string): Promise<UrlEntity> {
    const url = await this.prisma.uRL.update({
      where: { id },
      data: {
        status,
        erro,
        testadoEm: new Date(),
      },
    })

    return UrlEntity.create({
      id: url.id,
      endereco: url.endereco,
      status: url.status as UrlStatus,
      testadoEm: url.testadoEm,
      erro: url.erro,
      projetoId: url.projetoId,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.uRL.delete({
      where: { id },
    })
  }
}
