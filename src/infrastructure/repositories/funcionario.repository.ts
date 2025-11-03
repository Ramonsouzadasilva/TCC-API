import type { PrismaClient } from "@prisma/client"
import type { IFuncionarioRepository } from "../../domain/repositories/funcionario.repository.interface"
import { FuncionarioEntity, type TipoFuncionario } from "../../domain/entities/funcionario.entity"
import type { PaginatedResult } from "../../shared/types/pagination"

export class FuncionarioRepository implements IFuncionarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: {
    nome: string
    email: string
    senha: string
    cargo?: string
    tipo: TipoFuncionario
    empresaId: string
  }): Promise<FuncionarioEntity> {
    const funcionario = await this.prisma.funcionario.create({
      data,
    })

    return FuncionarioEntity.create({
      ...funcionario,
      tipo: funcionario.tipo as TipoFuncionario,
    })
  }

  async findById(id: string): Promise<FuncionarioEntity | null> {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { id },
    })

    return funcionario
      ? FuncionarioEntity.create({
          ...funcionario,
          tipo: funcionario.tipo as TipoFuncionario,
        })
      : null
  }

  async findByEmail(email: string): Promise<FuncionarioEntity | null> {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { email },
    })

    return funcionario
      ? FuncionarioEntity.create({
          ...funcionario,
          tipo: funcionario.tipo as TipoFuncionario,
        })
      : null
  }

  async findAll(page = 1, limit = 10): Promise<PaginatedResult<FuncionarioEntity>> {
    const skip = (page - 1) * limit

    const [funcionarios, total] = await Promise.all([
      this.prisma.funcionario.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.funcionario.count(),
    ])

    return {
      data: funcionarios.map((f) =>
        FuncionarioEntity.create({
          ...f,
          tipo: f.tipo as TipoFuncionario,
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

  async findByEmpresaId(empresaId: string, page = 1, limit = 10): Promise<PaginatedResult<FuncionarioEntity>> {
    const skip = (page - 1) * limit

    const [funcionarios, total] = await Promise.all([
      this.prisma.funcionario.findMany({
        where: { empresaId },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.funcionario.count({ where: { empresaId } }),
    ])

    return {
      data: funcionarios.map((f) =>
        FuncionarioEntity.create({
          ...f,
          tipo: f.tipo as TipoFuncionario,
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

  async update(
    id: string,
    data: {
      nome?: string
      email?: string
      senha?: string
      cargo?: string
      tipo?: TipoFuncionario
    },
  ): Promise<FuncionarioEntity> {
    const funcionario = await this.prisma.funcionario.update({
      where: { id },
      data,
    })

    return FuncionarioEntity.create({
      ...funcionario,
      tipo: funcionario.tipo as TipoFuncionario,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.funcionario.delete({
      where: { id },
    })
  }
}
