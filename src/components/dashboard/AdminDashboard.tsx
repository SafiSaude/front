/**
 * SAFISAUDE - Admin Dashboard
 * FASE 3.4 - Dashboard Role-Based
 *
 * Dashboard for Admin users with user management overview
 * Features: Active users, financeiros, suporte/operators, user table
 */

'use client';

import React from 'react';
import { StatCard, DataTable, Button, RoleBadge } from '@/components/ui';
import { UserRole } from '@/types/auth';

// Mock data for demonstration
const mockUsers = [
  { id: '1', email: 'maria@safi.com', role: UserRole.FINANCEIRO, status: 'Ativo' },
  { id: '2', email: 'joao@safi.com', role: UserRole.SUPORTE_ADMIN, status: 'Ativo' },
  { id: '3', email: 'ana@safi.com', role: UserRole.VISUALIZADOR, status: 'Inativo' },
  { id: '4', email: 'carlos@safi.com', role: UserRole.SECRETARIO, status: 'Ativo' },
];

export default function AdminDashboard() {
  const userColumns = [
    { key: 'id', header: 'ID' },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      render: (item: typeof mockUsers[0]) => <RoleBadge role={item.role} size="sm" />,
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: typeof mockUsers[0]) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            item.status === 'Ativo'
              ? 'bg-success-100 text-success-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Acoes',
      render: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Editar
          </Button>
          <Button variant="ghost" size="sm">
            Desativar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Painel Administrativo</h2>
          <p className="text-sm text-gray-500 mt-1">
            Gerenciamento de usuarios e permissoes
          </p>
        </div>
        <Button variant="primary">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Novo Usuario
        </Button>
      </div>

      {/* Stats Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Usuarios Ativos"
          value={89}
          subtitle="Conectados hoje"
          trend={{ direction: 'up', percentage: 8 }}
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
        />

        <StatCard
          title="Financeiros"
          value={12}
          subtitle="Ativos no sistema"
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
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          }
        />

        <StatCard
          title="Suporte/Operadores"
          value={65}
          subtitle="Time operacional"
          trend={{ direction: 'down', percentage: 3 }}
          borderColor="border-l-warning-500"
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
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
        />
      </div>

      {/* Users Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Usuarios do Sistema
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar usuario..."
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="">Todos os roles</option>
              <option value="FINANCEIRO">Financeiro</option>
              <option value="SUPORTE">Suporte</option>
              <option value="OPERADOR">Operador</option>
            </select>
          </div>
        </div>
        <DataTable
          columns={userColumns}
          data={mockUsers}
          emptyMessage="Nenhum usuario encontrado"
        />
      </div>
    </div>
  );
}
