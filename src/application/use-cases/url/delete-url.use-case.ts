import type { IUrlRepository } from "../../../domain/repositories/url.repository.interface"
import { NotFoundError } from "../../../shared/errors/app-error"

export class DeleteUrlUseCase {
  constructor(private readonly urlRepository: IUrlRepository) {}

  async execute(id: string): Promise<void> {
    const url = await this.urlRepository.findById(id)
    if (!url) {
      throw new NotFoundError("URL não encontrada")
    }

    await this.urlRepository.delete(id)
  }
}
