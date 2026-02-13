'use client';

/**
 * SAFISAUDE - Tenant Form Component
 * FASE 7.3 - Multi-Tenant Client Management
 *
 * Form for creating and editing tenants with optional secretario creation
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, FormField } from '@/components/ui';
import { Loader2 } from 'lucide-react';
import { BRAZILIAN_STATES, formatCNPJ } from '@/types/tenant';

// Validation schema
const tenantFormSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cnpj: z
    .string()
    .min(14, 'CNPJ inválido')
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ deve estar no formato 00.000.000/0000-00'),
  emailContato: z.string().email('Email inválido'),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  secretario: z
    .object({
      nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
      email: z.string().email('Email inválido'),
      senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
    })
    .optional(),
});

type TenantFormData = z.infer<typeof tenantFormSchema>;

interface TenantFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<TenantFormData>;
  onSubmit: (data: TenantFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function TenantForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: TenantFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TenantFormData>({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: initialData,
  });

  const cnpjValue = watch('cnpj');

  // Format CNPJ on input
  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setValue('cnpj', formatted);
  };

  const onSubmitForm = async (data: TenantFormData) => {
    try {
      setSubmitting(true);
      await onSubmit(data);
    } finally {
      setSubmitting(false);
    }
  };

  const isLoadingAny = submitting || isLoading;

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {/* Section 1: Tenant Data */}
      <div className="space-y-4 p-6 rounded-lg border border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">
          {mode === 'create' ? 'Dados do Cliente' : 'Editar Cliente'}
        </h3>

        {/* Nome */}
        <FormField label="Nome da Secretaria" required>
          <input
            type="text"
            placeholder="Secretaria Municipal de Saúde - São Paulo"
            {...register('nome')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
            disabled={isLoadingAny}
          />
          {errors.nome && (
            <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
          )}
        </FormField>

        {/* CNPJ */}
        <FormField label="CNPJ" required helperText="Formato: 00.000.000/0000-00">
          <input
            type="text"
            placeholder="12.345.678/0001-00"
            {...register('cnpj')}
            onChange={handleCNPJChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
            disabled={isLoadingAny}
          />
          {errors.cnpj && (
            <p className="mt-1 text-sm text-red-600">{errors.cnpj.message}</p>
          )}
        </FormField>

        {/* Email Contato */}
        <FormField label="Email de Contato" required>
          <input
            type="email"
            placeholder="contato@saude.gov.br"
            {...register('emailContato')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
            disabled={isLoadingAny}
          />
          {errors.emailContato && (
            <p className="mt-1 text-sm text-red-600">{errors.emailContato.message}</p>
          )}
        </FormField>

        {/* Cidade e Estado */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <FormField label="Cidade">
              <input
                type="text"
                placeholder="São Paulo"
                {...register('cidade')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                disabled={isLoadingAny}
              />
              {errors.cidade && (
                <p className="mt-1 text-sm text-red-600">{errors.cidade.message}</p>
              )}
            </FormField>
          </div>
          <FormField label="Estado">
            <select
              {...register('estado')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
              disabled={isLoadingAny}
            >
              <option value="">Selecione...</option>
              {BRAZILIAN_STATES.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.estado && (
              <p className="mt-1 text-sm text-red-600">{errors.estado.message}</p>
            )}
          </FormField>
        </div>
      </div>

      {/* Section 2: Secretario Data (only in create mode) */}
      {mode === 'create' && (
        <div className="space-y-4 p-6 rounded-lg border border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Primeiro Secretário</h3>
          <p className="text-sm text-gray-600">
            Crie o primeiro usuário (Secretário) que administrará este cliente
          </p>

          {/* Secretario Nome */}
          <FormField label="Nome Completo" required>
            <input
              type="text"
              placeholder="João Silva"
              {...register('secretario.nome')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
              disabled={isLoadingAny}
            />
            {errors.secretario?.nome && (
              <p className="mt-1 text-sm text-red-600">{errors.secretario.nome.message}</p>
            )}
          </FormField>

          {/* Secretario Email */}
          <FormField label="Email" required>
            <input
              type="email"
              placeholder="joao.silva@saude.gov.br"
              {...register('secretario.email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
              disabled={isLoadingAny}
            />
            {errors.secretario?.email && (
              <p className="mt-1 text-sm text-red-600">{errors.secretario.email.message}</p>
            )}
          </FormField>

          {/* Secretario Senha */}
          <FormField
            label="Senha"
            required
            helperText="Mínimo 8 caracteres. O secretário poderá alterar após primeiro login"
          >
            <input
              type="password"
              placeholder="••••••••"
              {...register('secretario.senha')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
              disabled={isLoadingAny}
            />
            {errors.secretario?.senha && (
              <p className="mt-1 text-sm text-red-600">{errors.secretario.senha.message}</p>
            )}
          </FormField>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoadingAny}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isLoadingAny}
          className="flex items-center gap-2"
        >
          {isLoadingAny && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === 'create' ? 'Criar Cliente' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  );
}
