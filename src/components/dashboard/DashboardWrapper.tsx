/**
 * SAFISAUDE - Dashboard Wrapper Component
 * FASE 3.4 - Dashboard Role-Based
 *
 * Routes users to their appropriate dashboard based on role
 */

'use client';

import React from 'react';
import { User, UserRole } from '@/types/auth';
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminDashboard from './AdminDashboard';
import FinanceiroDashboard from './FinanceiroDashboard';
import SuporteDashboard from './SuporteDashboard';
import OperadorDashboard from './OperadorDashboard';

interface DashboardWrapperProps {
  user: User;
}

export default function DashboardWrapper({ user }: DashboardWrapperProps) {
  switch (user.role) {
    case UserRole.SUPER_ADMIN:
      return <SuperAdminDashboard />;

    case UserRole.SUPORTE_ADMIN:
    case UserRole.FINANCEIRO_ADMIN:
      return <AdminDashboard />;

    case UserRole.FINANCEIRO:
      return <FinanceiroDashboard />;

    case UserRole.VISUALIZADOR:
      return <SuporteDashboard />;

    case UserRole.SECRETARIO:
      return <OperadorDashboard />;

    default:
      return (
        <div className="bg-error-50 border border-error-200 rounded-xl p-6 text-center">
          <svg
            className="w-12 h-12 text-error-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-error-700 mb-2">
            Role nao reconhecido
          </h3>
          <p className="text-error-600">
            O role <code className="bg-error-100 px-2 py-1 rounded">{user.role}</code> nao possui um dashboard configurado.
          </p>
          <p className="text-sm text-error-500 mt-2">
            Entre em contato com o suporte tecnico.
          </p>
        </div>
      );
  }
}
