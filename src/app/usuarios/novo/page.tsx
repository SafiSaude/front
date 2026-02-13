'use client';

/**
 * SAFISAUDE - Create User Page
 * FASE 5.4 - User Management - Create
 *
 * Page for creating a new user
 */

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUser } from '@/lib/api/users-api';
import { getApiErrorMessage } from '@/lib/api-client';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { CreateUserFormData, UpdateUserFormData } from '@/lib/form-schemas';
import { UserForm } from '@/components/forms/UserForm';
import { UserRole } from '@/types/auth';
import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function NewUserPage() {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verify Super Admin access
  useEffect(() => {
    if (currentUser && currentUser.role !== 'SUPER_ADMIN') {
      showError('Acesso restrito. Apenas Super Admin pode criar usuários.');
      router.push('/dashboard');
    }
  }, [currentUser, router]);

  const handleSubmit = async (data: CreateUserFormData | UpdateUserFormData) => {
    setIsSubmitting(true);
    try {
      // Type guard to ensure we have the create form data
      if (!('password' in data)) {
        showError('Dados inválidos para criação de usuário');
        return;
      }

      await createUser({
        email: data.email,
        nome: data.nome,
        role: data.role as Exclude<UserRole, UserRole.SUPER_ADMIN>,
        password: data.password,
      });
      showSuccess('Usuário criado com sucesso!');
      router.push('/usuarios');
    } catch (error) {
      const message = getApiErrorMessage(error);
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentUser?.role !== 'SUPER_ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="h-12 w-12 text-error-600" />
        <p className="text-lg font-semibold text-gray-900">Acesso Restrito</p>
        <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
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
        <h1 className="text-3xl font-bold text-gray-900">Criar Novo Usuário</h1>
        <p className="text-gray-600 mt-1">Preencha os dados do novo usuário administrativo</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-soft border border-gray-200 p-6 md:p-8">
        <UserForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => router.push('/usuarios')}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}
