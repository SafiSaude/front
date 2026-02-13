/**
 * SAFISAUDE - Operador Dashboard
 * FASE 3.4 - Dashboard Role-Based
 *
 * Dashboard for Operador users with transaction processing
 * Features: Transaction form, recent transactions table
 */

'use client';

import React, { useState } from 'react';
import { StatCard, DataTable, Button } from '@/components/ui';

// Mock data for demonstration
const mockRecentTransactions = [
  { id: 1, data: '2024-01-27 14:30', tipo: 'Entrada', valor: 'R$ 250,00', categoria: 'Consulta', descricao: 'Consulta Dr. Silva' },
  { id: 2, data: '2024-01-27 14:15', tipo: 'Entrada', valor: 'R$ 180,00', categoria: 'Exame', descricao: 'Hemograma completo' },
  { id: 3, data: '2024-01-27 13:45', tipo: 'Saida', valor: 'R$ 450,00', categoria: 'Material', descricao: 'Luvas e mascaras' },
  { id: 4, data: '2024-01-27 13:20', tipo: 'Entrada', valor: 'R$ 500,00', categoria: 'Procedimento', descricao: 'Curativo especial' },
  { id: 5, data: '2024-01-27 12:50', tipo: 'Entrada', valor: 'R$ 120,00', categoria: 'Consulta', descricao: 'Retorno paciente' },
];

interface TransactionForm {
  data: string;
  tipo: 'entrada' | 'saida';
  valor: string;
  categoria: string;
  descricao: string;
}

const categorias = [
  'Consulta',
  'Exame',
  'Procedimento',
  'Material',
  'Fornecedor',
  'Medicamento',
  'Equipamento',
  'Outros',
];

export default function OperadorDashboard() {
  const [form, setForm] = useState<TransactionForm>({
    data: new Date().toISOString().split('T')[0],
    tipo: 'entrada',
    valor: '',
    categoria: '',
    descricao: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
      data: new Date().toISOString().split('T')[0],
      tipo: 'entrada',
      valor: '',
      categoria: '',
      descricao: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form after submission
    handleClear();
    setIsSubmitting(false);
    alert('Transacao processada com sucesso!');
  };

  const transactionColumns = [
    { key: 'data', header: 'Data/Hora' },
    {
      key: 'tipo',
      header: 'Tipo',
      render: (item: typeof mockRecentTransactions[0]) => (
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
      render: (item: typeof mockRecentTransactions[0]) => (
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
      key: 'descricao',
      header: 'Descricao',
      className: 'max-w-[200px] truncate',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Painel do Operador</h2>
        <p className="text-sm text-gray-500 mt-1">
          Registro de transacoes financeiras
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Transacoes Hoje"
          value={23}
          subtitle="Processadas por voce"
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          }
        />

        <StatCard
          title="Volume Processado"
          value="R$ 4.850"
          subtitle="Hoje"
          trend={{ direction: 'up', percentage: 12 }}
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
          title="Media por Transacao"
          value="R$ 210,87"
          subtitle="Hoje"
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
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
          }
        />
      </div>

      {/* Transaction Form */}
      <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Nova Transacao
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Data */}
            <div>
              <label
                htmlFor="data"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Data
              </label>
              <input
                type="date"
                id="data"
                name="data"
                value={form.data}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipo"
                    value="entrada"
                    checked={form.tipo === 'entrada'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-success-600 border-gray-300 focus:ring-success-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Entrada</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipo"
                    value="saida"
                    checked={form.tipo === 'saida'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-error-600 border-gray-300 focus:ring-error-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Saida</span>
                </label>
              </div>
            </div>

            {/* Valor */}
            <div>
              <label
                htmlFor="valor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Valor (R$)
              </label>
              <input
                type="text"
                id="valor"
                name="valor"
                value={form.valor}
                onChange={handleInputChange}
                placeholder="0,00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {/* Categoria */}
            <div>
              <label
                htmlFor="categoria"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Categoria
              </label>
              <select
                id="categoria"
                name="categoria"
                value={form.categoria}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Descricao */}
            <div className="md:col-span-2">
              <label
                htmlFor="descricao"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descricao
              </label>
              <input
                type="text"
                id="descricao"
                name="descricao"
                value={form.descricao}
                onChange={handleInputChange}
                placeholder="Descreva a transacao..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClear}
              disabled={isSubmitting}
            >
              Limpar
            </Button>
            <Button
              type="submit"
              variant="success"
              isLoading={isSubmitting}
            >
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Processar
            </Button>
          </div>
        </form>
      </div>

      {/* Recent Transactions Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Minhas Transacoes Recentes
        </h3>
        <DataTable
          columns={transactionColumns}
          data={mockRecentTransactions}
          emptyMessage="Nenhuma transacao encontrada"
        />
      </div>
    </div>
  );
}
