'use client';

import { formatCurrency } from '@/lib/api/lancamentos-api';
import type { LancamentosStats } from '@/types/lancamento';

interface Props {
  stats: LancamentosStats | null;
  isLoading: boolean;
}

export function LancamentosStats({ stats, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total de Lançamentos */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total de Lançamentos</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.totalLancamentos.toLocaleString('pt-BR')}
            </p>
          </div>
          <div className="text-3xl text-blue-100">📄</div>
        </div>
      </div>

      {/* Valor Total Bruto */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Valor Total Bruto</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {formatCurrency(stats.valorTotalBruto)}
            </p>
          </div>
          <div className="text-3xl text-yellow-100">💰</div>
        </div>
      </div>

      {/* Valor Total Líquido */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Valor Total Líquido</p>
            <p className="text-lg font-bold text-green-600 mt-1">
              {formatCurrency(stats.valorTotalLiquido)}
            </p>
          </div>
          <div className="text-3xl text-green-100">✅</div>
        </div>
      </div>

      {/* Período Recente */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Período Recente</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {String(stats.periodoMaisRecente.mes).padStart(2, '0')}/
              {stats.periodoMaisRecente.ano}
            </p>
          </div>
          <div className="text-3xl text-purple-100">📅</div>
        </div>
      </div>
    </div>
  );
}
