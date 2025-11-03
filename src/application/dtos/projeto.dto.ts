import { z } from "zod"

export const CreateProjetoDtoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").max(255),
  descricao: z.string().max(1000).optional(),
  empresaId: z.string().uuid("ID da empresa inválido"),
})

export const UpdateProjetoDtoSchema = z.object({
  nome: z.string().min(1).max(255).optional(),
  descricao: z.string().max(1000).optional(),
})

export const ProjetoResponseDtoSchema = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  descricao: z.string().nullable(),
  empresaId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type CreateProjetoDto = z.infer<typeof CreateProjetoDtoSchema>
export type UpdateProjetoDto = z.infer<typeof UpdateProjetoDtoSchema>
export type ProjetoResponseDto = z.infer<typeof ProjetoResponseDtoSchema>
