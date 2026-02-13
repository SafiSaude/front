'use client';

/**
 * SAFISAUDE - Edit User Page
 * FASE 5.4 - User Management - Edit
 *
 * Page for editing an existing user
 */

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchUserById, updateUser, UserResponse } from '@/lib/api/users-api';
import { getApiErrorMessage } from '@/lib/api-client';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { UpdateUserFormData } from '@/lib/form-schemas';
import { UserForm } from '@/components/forms/UserForm';
import { UserRole } from '@/types/auth';
import { AlertCircle, Loader } from 'lucide-react';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();

  const { user: currentUser } = useAuth();
  const { showSuccess, showError } = useToast();

  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract userId from params (client-side only)
  useEffect(() => {
    if (params?.id) {
      setUserId(params.id as string);
    }
  }, [params]);

  // Verify Super Admin access
  useEffect(() => {
    if (currentUser && currentUser.role !== 'SUPER_ADMIN') {
      showError('Acesso restrito. Apenas Super Admin pode editar usuários.');
      router.push('/dashboard');
    }
  }, [currentUser, router, showError]);

  // Load user data
  useEffect(() => {
    const loadUser = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        const data = await fetchUserById(userId);
        // Don't allow editing Super Admin users
        if (data.role === 'SUPER_ADMIN') {
          showError('Não é possível editar Super Admin');
          router.push('/usuarios');
          return;
        }
        setUser(data);
      } catch (error) {
        const message = getApiErrorMessage(error);
        showError(message);
        router.push('/usuarios');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  const handleSubmit = async (data: UpdateUserFormData) => {
    if (!userId) return;

    setIsSubmitting(true);
    try {
      const updatedUser = await updateUser(userId, {
        nome: data.nome,
        role: data.role as Exclude<UserRole, UserRole.SUPER_ADMIN>,
        ativo: data.ativo,
      });
      showSuccess('Usuário atualizado com sucesso!');
      setUser(updatedUser);
      router.push('/usuarios');
    } catch (error) {
      const message = getApiErrorMessage(error);
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check permissions
  if (currentUser?.role !== 'SUPER_ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="h-12 w-12 text-error-600" />
        <p className="text-lg font-semibold text-gray-900">Acesso Restrito</p>
        <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
        <p className="text-gray-600">Carregando usuário...</p>
      </div>
    );
  }

  // Not found state
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="h-12 w-12 text-error-600" />
        <p className="text-lg font-semibold text-gray-900">Usuário não encontrado</p>
        <Link href="/usuarios" className="text-primary-600 hover:text-primary-700">
          ← Voltar para lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/usuarios" className="text-primary-600 hover:text-primary-700">
          ← Voltar para lista
        </Link>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Editar Usuário</h1>
        <p className="text-gray-600 mt-1">Atualize os dados de {user.nome}</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-soft border border-gray-200 p-6 md:p-8">
        <UserForm
          mode="edit"
          initialData={{
            nome: user.nome,
            email: user.email,
            role: user.role,
          }}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/usuarios')}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}
