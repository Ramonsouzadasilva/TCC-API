import { z } from "zod"

export const LoginDtoSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
})

export type LoginDto = z.infer<typeof LoginDtoSchema>

export const LoginResponseDtoSchema = z.object({
  token: z.string(),
  funcionario: z.object({
    id: z.string(),
    nome: z.string(),
    email: z.string(),
    tipo: z.enum(["GERENTE", "FUNCIONARIO"]),
    cargo: z.string().optional(),
    empresaId: z.string(),
  }),
})

export type LoginResponseDto = z.infer<typeof LoginResponseDtoSchema>
