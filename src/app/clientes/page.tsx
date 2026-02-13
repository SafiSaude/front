'use client';

/**
 * SAFISAUDE - Tenants List Page
 * FASE 7.3 - Multi-Tenant Client Management
 *
 * Display list of all tenants (clients/Secretarias de Saúde)
 * Only accessible by SUPER_ADMIN
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Tenant } from '@/types/tenant';
import { UserRole } from '@/types/auth';
import { fetchTenants, deleteTenant } from '@/lib/api/tenants-api';
import { Button } from '@/components/ui';
import { useToast } from '@/context/ToastContext';
import { Building2, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';

export default function ClientesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { showError, showSuccess } = useToast();

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Mark component as mounted (hydration fix)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check authorization after auth is loaded
  useEffect(() => {
    if (mounted && !authLoading) {
      if (user?.role === UserRole.SUPER_ADMIN) {
        setIsAuthorized(true);
        loadTenants();
      } else {
        showError('Acesso restrito. Apenas Super Admin pode gerenciar clientes.');
        setTimeout(() => router.push('/dashboard'), 1000);
      }
    }
  }, [user, router, showError, mounted, authLoading]);

  // Load tenants
  const loadTenants = async () => {
    try {
      setLoading(true);
      const data = await fetchTenants();
      setTenants(data);
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Tem certeza que deseja deletar o cliente "${nome}"?\n\nEsta ação é irreversível e deletará todos os usuários do cliente!`)) {
      return;
    }

    try {
      setDeleting(id);
      await deleteTenant(id);
      setTenants(tenants.filter((t) => t.id !== id));
      showSuccess('Cliente deletado com sucesso');
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Erro ao deletar cliente');
    } finally {
      setDeleting(null);
    }
  };

  if (loading || authLoading || !mounted || !isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary-600" />
            Clientes
          </h1>
          <p className="text-gray-600 mt-1">Gerenciar Secretarias de Saúde</p>
        </div>
        <Button
          onClick={() => router.push('/clientes/novo')}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      {/* Empty State */}
      {tenants.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900">Nenhum cliente cadastrado</h3>
          <p className="text-gray-600 mt-1 mb-4">
            Comece criando o primeiro cliente para começar a usar o sistema
          </p>
          <Button
            onClick={() => router.push('/clientes/novo')}
            variant="primary"
            className="mx-auto"
          >
            Criar Primeiro Cliente
          </Button>
        </div>
      ) : (
        /* Table */
        <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Secretaria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  CNPJ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Localização
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{tenant.nome}</p>
                      <p className="text-xs text-gray-500">{tenant.emailContato}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {tenant.cnpj}
                    </code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">
                      {tenant.cidade && tenant.estado ? `${tenant.cidade}, ${tenant.estado}` : '-'}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        tenant.ativo
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tenant.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/clientes/${tenant.id}/editar`)}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded transition-colors"
                        aria-label="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(tenant.id, tenant.nome)}
                        disabled={deleting === tenant.id}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                        aria-label="Deletar"
                      >
                        {deleting === tenant.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
