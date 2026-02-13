import { z } from 'zod';

/**
 * Schemas de validação Zod para formulários
 * Reutilizáveis em toda a aplicação
 */

// Schema para autenticação
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  fullName: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres'),
  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z
    .string()
    .min(6, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

// Schema para transações (entrada/saída)
export const TransactionSchema = z.object({
  type: z.enum(['income', 'expense'], {
    message: 'Tipo invalido',
  }),
  amount: z
    .number()
    .positive('Valor deve ser maior que zero')
    .refine((value) => value > 0, 'Valor deve ser maior que zero'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .min(5, 'Descrição deve ter no mínimo 5 caracteres')
    .max(500, 'Descrição não pode exceder 500 caracteres'),
  category: z
    .string()
    .min(1, 'Categoria é obrigatória'),
  date: z
    .date()
    .max(new Date(), 'Data não pode ser no futuro'),
});

// Schema para filtro de transações
export const TransactionFilterSchema = z.object({
  type: z.enum(['income', 'expense', 'all']).optional(),
  category: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
});

// Schema para perfil de usuário
export const UserProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z
    .string()
    .email('Email inválido'),
  role: z.enum(['admin', 'manager', 'operator', 'viewer']),
});

/**
 * Schemas para gerenciamento de usuários administrativos (FASE 5)
 */

export const CreateUserSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome não pode exceder 100 caracteres'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  role: z.enum(['SUPORTE_ADMIN', 'FINANCEIRO_ADMIN', 'SECRETARIO', 'FINANCEIRO', 'VISUALIZADOR'], {
    message: 'Perfil inválido'
  }),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(128, 'Senha não pode exceder 128 caracteres'),
});

export const UpdateUserSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome não pode exceder 100 caracteres'),
  role: z.enum(['SUPORTE_ADMIN', 'FINANCEIRO_ADMIN', 'SECRETARIO', 'FINANCEIRO', 'VISUALIZADOR'], {
    message: 'Perfil inválido'
  }),
  ativo: z.boolean().optional(),
});

// Type inference do Zod
export type LoginFormData = z.infer<typeof LoginSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
export type TransactionFormData = z.infer<typeof TransactionSchema>;
export type TransactionFilterData = z.infer<typeof TransactionFilterSchema>;
export type UserProfileData = z.infer<typeof UserProfileSchema>;
export type CreateUserFormData = z.infer<typeof CreateUserSchema>;
export type UpdateUserFormData = z.infer<typeof UpdateUserSchema>;
