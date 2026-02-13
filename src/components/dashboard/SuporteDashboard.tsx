/**
 * SAFISAUDE - Suporte Dashboard
 * FASE 3.4 - Dashboard Role-Based
 *
 * Dashboard for Suporte users with operator management
 * Features: Active operators, open tickets, resolution rate, operator table
 */

'use client';

import React, { useState } from 'react';
import { StatCard, DataTable, Button, RoleBadge } from '@/components/ui';
import { UserRole } from '@/types/auth';

// Mock data for demonstration
const mockOperators = [
  { id: '1', nome: 'Carlos Silva', email: 'carlos@safi.com', status: 'Online', transacoesHoje: 45 },
  { id: '2', nome: 'Maria Santos', email: 'maria.op@safi.com', status: 'Online', transacoesHoje: 38 },
  { id: '3', nome: 'Joao Pereira', email: 'joao.op@safi.com', status: 'Ausente', transacoesHoje: 22 },
  { id: '4', nome: 'Ana Costa', email: 'ana.op@safi.com', status: 'Offline', transacoesHoje: 0 },
  { id: '5', nome: 'Pedro Lima', email: 'pedro@safi.com', status: 'Online', transacoesHoje: 51 },
];

const mockTickets = [
  { id: 'TK-001', assunto: 'Erro ao processar transacao', operador: 'Carlos Silva', prioridade: 'Alta', status: 'Aberto' },
  { id: 'TK-002', assunto: 'Duvida sobre categoria', operador: 'Maria Santos', prioridade: 'Baixa', status: 'Em andamento' },
  { id: 'TK-003', assunto: 'Sistema lento', operador: '-', prioridade: 'Media', status: 'Aberto' },
];

export default function SuporteDashboard() {
  const [activeTab, setActiveTab] = useState<'operadores' | 'tickets'>('operadores');

  const operatorColumns = [
    { key: 'nome', header: 'Nome' },
    { key: 'email', header: 'Email' },
    {
      key: 'status',
      header: 'Status',
      render: (item: typeof mockOperators[0]) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            item.status === 'Online'
              ? 'bg-success-100 text-success-700'
              : item.status === 'Ausente'
              ? 'bg-warning-100 text-warning-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: 'transacoesHoje',
      header: 'Transacoes Hoje',
      render: (item: typeof mockOperators[0]) => (
        <span className="font-medium">{item.transacoesHoje}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Acoes',
      render: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Ver
          </Button>
          <Button variant="ghost" size="sm">
            Resetar Senha
          </Button>
        </div>
      ),
    },
  ];

  const ticketColumns = [
    { key: 'id', header: 'ID' },
    { key: 'assunto', header: 'Assunto' },
    { key: 'operador', header: 'Operador' },
    {
      key: 'prioridade',
      header: 'Prioridade',
      render: (item: typeof mockTickets[0]) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            item.prioridade === 'Alta'
              ? 'bg-error-100 text-error-700'
              : item.prioridade === 'Media'
              ? 'bg-warning-100 text-warning-700'
              : 'bg-info-100 text-info-700'
          }`}
        >
          {item.prioridade}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: typeof mockTickets[0]) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            item.status === 'Aberto'
              ? 'bg-error-100 text-error-700'
              : item.status === 'Em andamento'
              ? 'bg-warning-100 text-warning-700'
              : 'bg-success-100 text-success-700'
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Painel de Suporte</h2>
          <p className="text-sm text-gray-500 mt-1">
            Gerenciamento de operadores e tickets
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            Resetar Senha
          </Button>
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Criar Operador
          </Button>
        </div>
      </div>

      {/* Stats Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Operadores Ativos"
          value={42}
          subtitle="Online agora"
          trend={{ direction: 'up', percentage: 5 }}
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
        />

        <StatCard
          title="Tickets Abertos"
          value={18}
          subtitle="Aguardando atencao"
          trend={{ direction: 'down', percentage: 12 }}
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
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          }
        />

        <StatCard
          title="Taxa de Resolucao"
          value="94.5%"
          subtitle="Ultimos 7 dias"
          trend={{ direction: 'up', percentage: 3 }}
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab('operadores')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'operadores'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Operadores
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'tickets'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tickets
            <span className="ml-2 px-2 py-0.5 text-xs bg-error-100 text-error-700 rounded-full">
              {mockTickets.filter(t => t.status === 'Aberto').length}
            </span>
          </button>
        </nav>
      </div>

      {/* Table Content */}
      {activeTab === 'operadores' ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Lista de Operadores
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Buscar operador..."
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">Todos os status</option>
                <option value="online">Online</option>
                <option value="ausente">Ausente</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>
          <DataTable
            columns={operatorColumns}
            data={mockOperators}
            emptyMessage="Nenhum operador encontrado"
          />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Tickets de Suporte
            </h3>
            <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="">Todos os status</option>
              <option value="aberto">Aberto</option>
              <option value="andamento">Em andamento</option>
              <option value="resolvido">Resolvido</option>
            </select>
          </div>
          <DataTable
            columns={ticketColumns}
            data={mockTickets}
            emptyMessage="Nenhum ticket encontrado"
          />
        </div>
      )}
    </div>
  );
}
