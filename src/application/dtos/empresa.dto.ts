import { z } from "zod"

export const CreateEmpresaDtoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").max(255),
  cnpj: z
    .string()
    .regex(/^\d{14}$/, "CNPJ deve conter 14 dígitos")
    .optional(),
})

export const UpdateEmpresaDtoSchema = z.object({
  nome: z.string().min(1).max(255).optional(),
  cnpj: z
    .string()
    .regex(/^\d{14}$/, "CNPJ deve conter 14 dígitos")
    .optional(),
})

export const EmpresaResponseDtoSchema = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  cnpj: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type CreateEmpresaDto = z.infer<typeof CreateEmpresaDtoSchema>
export type UpdateEmpresaDto = z.infer<typeof UpdateEmpresaDtoSchema>
export type EmpresaResponseDto = z.infer<typeof EmpresaResponseDtoSchema>
