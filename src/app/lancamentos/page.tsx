'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useRequireAuth } from '@/context/AuthContext';
import { LancamentosTable } from '@/components/lancamentos/LancamentosTable';
import { LancamentosFilters } from '@/components/lancamentos/LancamentosFilters';
import { LancamentoDetailModal } from '@/components/lancamentos/LancamentoDetailModal';
import { LancamentosStats } from '@/components/lancamentos/LancamentosStats';
import { fetchLancamentos, fetchLancamentosStats } from '@/lib/api/lancamentos-api';
import type {
  Lancamento,
  LancamentosFilters as Filters,
  PaginatedLancamentosResponse,
  LancamentosStats as Stats,
} from '@/types/lancamento';

export default function LancamentosPage() {
  // Proteção de autenticação
  useRequireAuth();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [pagination, setPagination] = useState<PaginatedLancamentosResponse['pagination'] | null>(
    null,
  );
  const [stats, setStats] = useState<Stats | null>(null);
  const [filters, setFilters] = useState<Filters>({ page: 1, limit: 20 });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLancamento, setSelectedLancamento] = useState<Lancamento | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tiposRepasse, setTiposRepasse] = useState<string[]>([]);
  const [contasBancarias, setContasBancarias] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // Carregar dados quando os filtros mudarem
  useEffect(() => {
    if (!mounted || authLoading || !isAuthenticated) return;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Criar filtros para stats (sem paginação)
        const statsFilters = {
          ano: filters.ano,
          mes: filters.mes,
          tpRepasse: filters.tpRepasse,
          banco: filters.banco,
          agencia: filters.agencia,
          conta: filters.conta,
          search: filters.search,
          cnpj: filters.cnpj,
          municipio: filters.municipio,
          uf: filters.uf,
        };

        const [lancamentosData, statsData] = await Promise.all([
          fetchLancamentos(filters),
          fetchLancamentosStats(statsFilters),
        ]);

        setLancamentos(lancamentosData.data);
        setPagination(lancamentosData.pagination);
        setStats(statsData);

        // Extrair tipos de repasse únicos para filtros
        if (statsData.tiposRepasse && statsData.tiposRepasse.length > 0) {
          setTiposRepasse(statsData.tiposRepasse.map((t) => t.tipo));
        }

        // Extrair contas bancárias para filtros
        if (statsData.contasBancarias && statsData.contasBancarias.length > 0) {
          setContasBancarias(statsData.contasBancarias);
        }
      } catch (error) {
        console.error('Erro ao carregar lançamentos:', error);
        setError(
          'Erro ao carregar lançamentos. Por favor, tente novamente.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [filters, mounted, authLoading, isAuthenticated]);

  const handleRowClick = (lancamento: Lancamento) => {
    setSelectedLancamento(lancamento);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
    window.scrollTo(0, 0);
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // Show loading while authenticating
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lançamentos de Recursos</h1>
        <p className="text-gray-600 mt-2">
          Visualize os repasses federais da saúde do seu órgão
        </p>
      </div>

      {/* Estatísticas */}
      <LancamentosStats stats={stats} isLoading={isLoading} />

      {/* Erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Layout Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtros (Sidebar) */}
        <div className="lg:col-span-1">
          <LancamentosFilters
            filters={filters}
            onFiltersChange={setFilters}
            tiposRepasse={tiposRepasse}
            contasBancarias={contasBancarias}
            anosDisponiveis={stats?.anos || []}
          />
        </div>

        {/* Tabela */}
        <div className="lg:col-span-3">
          {/* Tabela de Lançamentos */}
          <LancamentosTable
            lancamentos={lancamentos}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />

          {/* Paginação */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-6 bg-white border rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm text-gray-600">
                Página {pagination.page} de {pagination.totalPages} (
                {pagination.total} registros)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Próxima →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes */}
      <LancamentoDetailModal
        lancamento={selectedLancamento}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLancamento(null);
        }}
      />
    </div>
  );
}
