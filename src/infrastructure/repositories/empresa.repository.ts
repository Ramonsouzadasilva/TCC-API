import type { PrismaClient } from "@prisma/client"
import type { IEmpresaRepository } from "../../domain/repositories/empresa.repository.interface"
import { EmpresaEntity } from "../../domain/entities/empresa.entity"

export class EmpresaRepository implements IEmpresaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: { nome: string; cnpj?: string }): Promise<EmpresaEntity> {
    const empresa = await this.prisma.empresa.create({
      data: {
        nome: data.nome,
        cnpj: data.cnpj,
      },
    })

    return EmpresaEntity.create(empresa)
  }

  async findById(id: string): Promise<EmpresaEntity | null> {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id },
    })

    return empresa ? EmpresaEntity.create(empresa) : null
  }

  async findAll(): Promise<EmpresaEntity[]> {
    const empresas = await this.prisma.empresa.findMany({
      orderBy: { createdAt: "desc" },
    })

    return empresas.map((empresa) => EmpresaEntity.create(empresa))
  }

  async update(id: string, data: { nome?: string; cnpj?: string }): Promise<EmpresaEntity> {
    const empresa = await this.prisma.empresa.update({
      where: { id },
      data,
    })

    return EmpresaEntity.create(empresa)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.empresa.delete({
      where: { id },
    })
  }
}
