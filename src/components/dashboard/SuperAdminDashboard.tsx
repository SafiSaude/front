/**
 * SAFISAUDE - Super Admin Dashboard
 * FASE 3.4 - Dashboard Role-Based
 *
 * Dashboard for Super Admin users with system-wide overview
 * Features: Total users, admin count, operators, transactions
 */

'use client';

import React from 'react';
import { StatCard, DataTable } from '@/components/ui';

// Mock data for demonstration
const mockSystemLogs = [
  { id: 1, timestamp: '2024-01-27 14:30', action: 'Login', user: 'admin@safi.com', ip: '192.168.1.100' },
  { id: 2, timestamp: '2024-01-27 14:25', action: 'Criar Usuario', user: 'admin@safi.com', ip: '192.168.1.100' },
  { id: 3, timestamp: '2024-01-27 14:20', action: 'Atualizar Role', user: 'super@safi.com', ip: '192.168.1.101' },
];

const logColumns = [
  { key: 'timestamp', header: 'Data/Hora' },
  { key: 'action', header: 'Acao' },
  { key: 'user', header: 'Usuario' },
  { key: 'ip', header: 'IP' },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Painel Super Admin</h2>
        <p className="text-sm text-gray-500 mt-1">
          Visao geral completa do sistema
        </p>
      </div>

      {/* Stats Grid - 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total de Usuarios"
          value={156}
          subtitle="Ativos no sistema"
          trend={{ direction: 'up', percentage: 12 }}
          borderColor="border-l-purple-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
        />

        <StatCard
          title="Admins Ativos"
          value={8}
          subtitle="Administradores"
          borderColor="border-l-primary-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          }
        />

        <StatCard
          title="Operadores"
          value={42}
          subtitle="Processando transacoes"
          trend={{ direction: 'up', percentage: 5 }}
          borderColor="border-l-gray-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
        />

        <StatCard
          title="Transacoes"
          value="R$ 1.2M"
          subtitle="Volume total do mes"
          trend={{ direction: 'up', percentage: 18 }}
          borderColor="border-l-success-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </div>

      {/* System Logs Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Logs do Sistema
        </h3>
        <DataTable
          columns={logColumns}
          data={mockSystemLogs}
          emptyMessage="Nenhum log encontrado"
        />
      </div>
    </div>
  );
}
