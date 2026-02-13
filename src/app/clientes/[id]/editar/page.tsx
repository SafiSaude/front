'use client';

/**
 * SAFISAUDE - Edit Tenant Page
 * FASE 7.3 - Multi-Tenant Client Management
 *
 * Page for editing tenant information
 * Only accessible by SUPER_ADMIN
 */

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/auth';
import { Tenant } from '@/types/tenant';
import { TenantForm } from '@/components/forms/TenantForm';
import { fetchTenant, updateTenant } from '@/lib/api/tenants-api';
import { useToast } from '@/context/ToastContext';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function EditarClientePage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const tenantId = params.id as string;
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Check authorization
  useEffect(() => {
    if (user && user.role !== UserRole.SUPER_ADMIN) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Load tenant data
  useEffect(() => {
    const loadTenant = async () => {
      if (!tenantId) return;
      try {
        setLoading(true);
        const data = await fetchTenant(tenantId);
        setTenant(data);
      } catch (error) {
        showError(error instanceof Error ? error.message : 'Erro ao carregar cliente');
        router.push('/clientes');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === UserRole.SUPER_ADMIN) {
      loadTenant();
    }
  }, [tenantId, user, router, showError]);

  const handleSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      // Remove secretario field (not used in edit mode)
      const { secretario, ...updateData } = data;
      await updateTenant(tenantId, updateData);
      showSuccess('Cliente atualizado com sucesso!');
      router.push('/clientes');
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Erro ao atualizar cliente');
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!tenant || user?.role !== UserRole.SUPER_ADMIN) {
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
        <h1 className="text-3xl font-bold text-gray-900">Editar Cliente</h1>
        <p className="text-gray-600 mt-1">{tenant.nome}</p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <TenantForm
          mode="edit"
          initialData={tenant}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/clientes')}
          isLoading={submitting}
        />
      </div>
    </div>
  );
}
