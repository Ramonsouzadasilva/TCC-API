export enum UrlStatus {
  PENDENTE = "PENDENTE",
  SUCESSO = "SUCESSO",
  ERRO = "ERRO",
}

export class UrlEntity {
  constructor(
    public readonly id: string,
    public readonly endereco: string,
    public readonly status: UrlStatus,
    public readonly testadoEm: Date | null,
    public readonly erro: string | null,
    public readonly projetoId: string,
  ) {}

  static create(props: {
    id: string
    endereco: string
    status: UrlStatus
    testadoEm?: Date | null
    erro?: string | null
    projetoId: string
  }): UrlEntity {
    return new UrlEntity(
      props.id,
      props.endereco,
      props.status,
      props.testadoEm ?? null,
      props.erro ?? null,
      props.projetoId,
    )
  }
}
