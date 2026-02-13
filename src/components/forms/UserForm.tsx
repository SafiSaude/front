'use client';

/**
 * SAFISAUDE - User Form Component
 * FASE 5.3 - Reusable User Form for Create/Edit
 *
 * Handles both creation and editing of users with React Hook Form
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/Input';
import Select, { SelectOption } from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { CreateUserSchema, UpdateUserSchema, CreateUserFormData, UpdateUserFormData } from '@/lib/form-schemas';
import { UserRole } from '@/types/auth';

const roleOptions: SelectOption[] = [
  { value: 'SUPORTE_ADMIN', label: 'Suporte Admin (Plataforma)' },
  { value: 'FINANCEIRO_ADMIN', label: 'Financeiro Admin (Plataforma)' },
  { value: 'SECRETARIO', label: 'Secretário (Admin do Cliente)' },
  { value: 'FINANCEIRO', label: 'Financeiro (Cliente)' },
  { value: 'VISUALIZADOR', label: 'Visualizador (Cliente - Leitura)' },
];

interface UserFormProps {
  mode: 'create' | 'edit';
  initialData?: {
    nome: string;
    email: string;
    role: UserRole;
  };
  onSubmit: (data: CreateUserFormData | UpdateUserFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function UserForm({ mode, initialData, onSubmit, onCancel, isLoading = false }: UserFormProps) {
  const schema = mode === 'create' ? CreateUserSchema : UpdateUserSchema;
  type FormData = typeof schema extends typeof CreateUserSchema ? CreateUserFormData : UpdateUserFormData;

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialData ? {
      nome: initialData.nome,
      email: initialData.email,
      role: initialData.role as Exclude<UserRole, 'SUPER_ADMIN'>,
      ...(mode === 'create' && { password: '' }),
    } : {},
  });

  const handleFormSubmitWrapper = async (data: any) => {
    try {
      await onSubmit(data as CreateUserFormData | UpdateUserFormData);
      reset();
    } catch (error) {
      // Error handling is done by parent component via toast
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit(handleFormSubmitWrapper)} className="space-y-6">
      {/* Nome Field */}
      <Input
        label="Nome Completo"
        type="text"
        placeholder="João da Silva"
        required
        disabled={isLoading}
        containerClassName="space-y-2"
        {...register('nome')}
        error={typeof errors.nome?.message === 'string' ? errors.nome.message : undefined}
      />

      {/* Email Field */}
      {mode === 'create' && (
        <Input
          label="Email"
          type="email"
          placeholder="joao@example.com"
          required
          disabled={isLoading}
          containerClassName="space-y-2"
          {...register('email')}
          error={typeof errors.email?.message === 'string' ? errors.email.message : undefined}
        />
      )}

      {/* Email Display (Edit mode) */}
      {mode === 'edit' && initialData && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">Email</label>
          <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
            {initialData.email}
          </div>
          <p className="text-xs text-gray-500">Email não pode ser alterado</p>
        </div>
      )}

      {/* Role Select */}
      <Select
        label="Perfil"
        required
        disabled={isLoading}
        containerClassName="space-y-2"
        options={roleOptions}
        placeholder="Selecione um perfil"
        {...register('role')}
        error={typeof errors.role?.message === 'string' ? errors.role.message : undefined}
      />

      {/* Password Field (Create mode only) */}
      {mode === 'create' && (
        <Input
          label="Senha"
          type="password"
          placeholder="Mínimo 6 caracteres"
          required
          disabled={isLoading}
          containerClassName="space-y-2"
          {...register('password')}
          error={typeof errors.password?.message === 'string' ? errors.password.message : undefined}
        />
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button
          variant="secondary"
          size="md"
          type="button"
          disabled={isLoading}
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          size="md"
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          className="flex-1"
        >
          {mode === 'create' ? 'Criar Usuário' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  );
}
