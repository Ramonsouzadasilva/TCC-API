export class ProjetoEntity {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly descricao: string | null,
    public readonly empresaId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: {
    id: string
    nome: string
    descricao?: string | null
    empresaId: string
    createdAt: Date
    updatedAt: Date
  }): ProjetoEntity {
    return new ProjetoEntity(
      props.id,
      props.nome,
      props.descricao ?? null,
      props.empresaId,
      props.createdAt,
      props.updatedAt,
    )
  }
}
