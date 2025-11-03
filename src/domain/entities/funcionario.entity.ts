export enum TipoFuncionario {
  GERENTE = "GERENTE",
  DESENVOLVEDOR = "DESENVOLVEDOR",
  ANALISTA = "ANALISTA",
  DESIGNER = "DESIGNER",
  OUTRO = "OUTRO",
}

export class FuncionarioEntity {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly email: string,
    public readonly senha: string,
    public readonly cargo: string | null,
    public readonly tipo: TipoFuncionario,
    public readonly empresaId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: {
    id: string
    nome: string
    email: string
    senha: string
    cargo?: string | null
    tipo: TipoFuncionario
    empresaId: string
    createdAt: Date
    updatedAt: Date
  }): FuncionarioEntity {
    return new FuncionarioEntity(
      props.id,
      props.nome,
      props.email,
      props.senha,
      props.cargo ?? null,
      props.tipo,
      props.empresaId,
      props.createdAt,
      props.updatedAt,
    )
  }

  isGerente(): boolean {
    return this.tipo === TipoFuncionario.GERENTE
  }
}
