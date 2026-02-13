/**
 * SAFISAUDE - Financeiro Dashboard
 * FASE 3.4 - Dashboard Role-Based
 *
 * Dashboard for Financeiro users with financial overview
 * Features: Monthly revenue, transactions, average ticket, chart, transaction table
 */

'use client';

import React from 'react';
import { StatCard, DataTable, Button } from '@/components/ui';

// Mock data for demonstration
const mockTransactions = [
  { id: 1, data: '2024-01-27', tipo: 'Entrada', valor: 'R$ 5.000,00', categoria: 'Consulta', status: 'Aprovado' },
  { id: 2, data: '2024-01-27', tipo: 'Saida', valor: 'R$ 1.200,00', categoria: 'Fornecedor', status: 'Aprovado' },
  { id: 3, data: '2024-01-26', tipo: 'Entrada', valor: 'R$ 3.500,00', categoria: 'Exame', status: 'Pendente' },
  { id: 4, data: '2024-01-26', tipo: 'Saida', valor: 'R$ 800,00', categoria: 'Material', status: 'Aprovado' },
  { id: 5, data: '2024-01-25', tipo: 'Entrada', valor: 'R$ 2.100,00', categoria: 'Procedimento', status: 'Aprovado' },
];

export default function FinanceiroDashboard() {
  const transactionColumns = [
    { key: 'data', header: 'Data' },
    {
      key: 'tipo',
      header: 'Tipo',
      render: (item: typeof mockTransactions[0]) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            item.tipo === 'Entrada'
              ? 'bg-success-100 text-success-700'
              : 'bg-error-100 text-error-700'
          }`}
        >
          {item.tipo}
        </span>
      ),
    },
    {
      key: 'valor',
      header: 'Valor',
      render: (item: typeof mockTransactions[0]) => (
        <span
          className={`font-medium ${
            item.tipo === 'Entrada' ? 'text-success-600' : 'text-error-600'
          }`}
        >
          {item.tipo === 'Saida' ? '-' : '+'}{item.valor}
        </span>
      ),
    },
    { key: 'categoria', header: 'Categoria' },
    {
      key: 'status',
      header: 'Status',
      render: (item: typeof mockTransactions[0]) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            item.status === 'Aprovado'
              ? 'bg-success-100 text-success-700'
              : 'bg-warning-100 text-warning-700'
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
          <h2 className="text-2xl font-bold text-gray-900">Painel Financeiro</h2>
          <p className="text-sm text-gray-500 mt-1">
            Analise e gestao financeira
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Exportar
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
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Gerar Relatorio
          </Button>
        </div>
      </div>

      {/* Stats Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Receita do Mes"
          value="R$ 245.800"
          subtitle="Janeiro 2024"
          trend={{ direction: 'up', percentage: 15 }}
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

        <StatCard
          title="Transacoes"
          value={1.248}
          subtitle="No periodo"
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
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          }
        />

        <StatCard
          title="Ticket Medio"
          value="R$ 196,95"
          subtitle="Por transacao"
          trend={{ direction: 'down', percentage: 2 }}
          borderColor="border-l-info-500"
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
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          }
        />
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Fluxo de Caixa - Ultimos 30 dias
          </h3>
          <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="30">Ultimos 30 dias</option>
            <option value="60">Ultimos 60 dias</option>
            <option value="90">Ultimos 90 dias</option>
          </select>
        </div>

        {/* Chart Placeholder Area */}
        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
          <div className="text-center">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="text-gray-500 text-sm">Grafico sera implementado na proxima fase</p>
            <p className="text-gray-400 text-xs mt-1">Chart.js ou Recharts</p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Transacoes Recentes
          </h3>
          <div className="flex gap-2">
            <input
              type="date"
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="">Todos os tipos</option>
              <option value="entrada">Entrada</option>
              <option value="saida">Saida</option>
            </select>
          </div>
        </div>
        <DataTable
          columns={transactionColumns}
          data={mockTransactions}
          emptyMessage="Nenhuma transacao encontrada"
        />
      </div>
    </div>
  );
}
