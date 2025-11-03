import { z } from "zod"
import { TipoFuncionario } from "../../domain/entities/funcionario.entity"

export const CreateFuncionarioDtoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").max(255),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  cargo: z.string().max(100).optional(),
  tipo: z.nativeEnum(TipoFuncionario).default(TipoFuncionario.DESENVOLVEDOR),
  empresaId: z.string().uuid("ID da empresa inválido"),
})

export const UpdateFuncionarioDtoSchema = z.object({
  nome: z.string().min(1).max(255).optional(),
  email: z.string().email("Email inválido").optional(),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").optional(),
  cargo: z.string().max(100).optional(),
  tipo: z.nativeEnum(TipoFuncionario).optional(),
})

export const FuncionarioResponseDtoSchema = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  email: z.string(),
  cargo: z.string().nullable(),
  tipo: z.nativeEnum(TipoFuncionario),
  empresaId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const LoginDtoSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(1, "Senha é obrigatória"),
})

export type CreateFuncionarioDto = z.infer<typeof CreateFuncionarioDtoSchema>
export type UpdateFuncionarioDto = z.infer<typeof UpdateFuncionarioDtoSchema>
export type FuncionarioResponseDto = z.infer<typeof FuncionarioResponseDtoSchema>
export type LoginDto = z.infer<typeof LoginDtoSchema>
