'use client';

import { formatCurrency, formatCNPJ, formatDate } from '@/lib/api/lancamentos-api';
import type { Lancamento } from '@/types/lancamento';

interface Props {
  lancamentos: Lancamento[];
  isLoading: boolean;
  onRowClick: (lancamento: Lancamento) => void;
}

export function LancamentosTable({ lancamentos, isLoading, onRowClick }: Props) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando lançamentos...</p>
        </div>
      </div>
    );
  }

  if (lancamentos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-white border rounded-lg">
        Nenhum lançamento encontrado. Tente ajustar os filtros.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Município
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              CNPJ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Tipo Repasse
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Período
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Valor Bruto
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Valor Líquido
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Conta
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {lancamentos.map((lanc) => (
            <tr
              key={lanc.id}
              onClick={() => onRowClick(lanc)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 text-sm text-gray-600">
                {lanc.municipio}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatCNPJ(lanc.cnpj)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {lanc.tpRepasse}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {String(lanc.mes).padStart(2, '0')}/{lanc.ano}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                {formatCurrency(lanc.valorBruto)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 text-right">
                {formatCurrency(lanc.valorLiquido)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {lanc.banco && lanc.agencia && lanc.conta
                  ? `${lanc.banco} - ${lanc.agencia}/${lanc.conta}`
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
