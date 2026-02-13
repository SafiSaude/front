'use client';

/**
 * SAFISAUDE - Create Tenant Page
 * FASE 7.3 - Multi-Tenant Client Management
 *
 * Page for creating a new tenant with its first secretario
 * Only accessible by SUPER_ADMIN
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/auth';
import { TenantForm } from '@/components/forms/TenantForm';
import { createTenant } from '@/lib/api/tenants-api';
import { useToast } from '@/context/ToastContext';
import { ArrowLeft } from 'lucide-react';

export default function NovoClientePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Check authorization
  useEffect(() => {
    if (user && user.role !== UserRole.SUPER_ADMIN) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await createTenant(data);
      showSuccess('Cliente criado com sucesso!');
      router.push('/clientes');
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Erro ao criar cliente');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.role !== UserRole.SUPER_ADMIN) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/clientes')}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="h-5 w-5" />
          Voltar
        </button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Novo Cliente</h1>
        <p className="text-gray-600 mt-1">
          Crie uma nova Secretaria de Saúde e seu administrador
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <TenantForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => router.push('/clientes')}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
