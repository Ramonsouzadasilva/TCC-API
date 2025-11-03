export class EmpresaEntity {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly cnpj: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: {
    id: string
    nome: string
    cnpj?: string | null
    createdAt: Date
    updatedAt: Date
  }): EmpresaEntity {
    return new EmpresaEntity(props.id, props.nome, props.cnpj ?? null, props.createdAt, props.updatedAt)
  }
}
