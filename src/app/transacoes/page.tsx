'use client';

/**
 * SAFISAUDE - Transactions Page
 * FASE 6 - Transaction Management
 *
 * Page for managing transactions (currently placeholder)
 */

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function TransactionsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Verify authorization - only specific roles can access
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Allowed roles: SUPER_ADMIN, SUPORTE_ADMIN, FINANCEIRO_ADMIN, SECRETARIO, FINANCEIRO
    const allowedRoles = ['SUPER_ADMIN', 'SUPORTE_ADMIN', 'FINANCEIRO_ADMIN', 'SECRETARIO', 'FINANCEIRO'];
    if (allowedRoles.includes(user.role)) {
      setIsAuthorized(true);
    } else {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="h-12 w-12 text-error-600" />
        <p className="text-lg font-semibold text-gray-900">Acesso Restrito</p>
        <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transações</h1>
          <p className="text-gray-600 mt-1">Gerenciar transações do sistema</p>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-lg shadow-soft border border-gray-200 p-8">
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <svg
            className="w-16 h-16 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-600">Em Desenvolvimento</h2>
          <p className="text-gray-500 text-center">
            A página de transações está sendo desenvolvida.
            <br />
            Retorne em breve para gerenciar transações.
          </p>
        </div>
      </div>
    </div>
  );
}
