import { z } from "zod"

export const CreateUrlDtoSchema = z.object({
  endereco: z.string().url("URL inválida"),
  projetoId: z.string().uuid("ID do projeto inválido"),
})

export const UpdateUrlStatusDtoSchema = z.object({
  status: z.enum(["PENDENTE", "SUCESSO", "ERRO"]),
  erro: z.string().optional(),
})

export const UrlResponseDtoSchema = z.object({
  id: z.string().uuid(),
  endereco: z.string(),
  status: z.enum(["PENDENTE", "SUCESSO", "ERRO"]),
  testadoEm: z.date().nullable(),
  erro: z.string().nullable(),
  projetoId: z.string(),
})

export type CreateUrlDto = z.infer<typeof CreateUrlDtoSchema>
export type UpdateUrlStatusDto = z.infer<typeof UpdateUrlStatusDtoSchema>
export type UrlResponseDto = z.infer<typeof UrlResponseDtoSchema>
