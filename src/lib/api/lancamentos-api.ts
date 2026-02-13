import { apiClient, getApiErrorMessage } from '@/lib/api-client';
import type {
  Lancamento,
  LancamentosFilters,
  PaginatedLancamentosResponse,
  LancamentosStats,
} from '@/types/lancamento';

export async function fetchLancamentos(
  filters: LancamentosFilters = {},
): Promise<PaginatedLancamentosResponse> {
  try {
    const params = new URLSearchParams();

    if (filters.ano) params.append('ano', filters.ano.toString());
    if (filters.mes) params.append('mes', filters.mes.toString());
    if (filters.tpRepasse) params.append('tpRepasse', filters.tpRepasse);
    if (filters.banco) params.append('banco', filters.banco);
    if (filters.agencia) params.append('agencia', filters.agencia);
    if (filters.conta) params.append('conta', filters.conta);
    if (filters.search) params.append('search', filters.search);

    // CNPJ: Strip formatting e validar 14 dígitos
    if (filters.cnpj) {
      const cleanedCnpj = filters.cnpj.replace(/\D/g, ''); // Remove não-dígitos
      if (cleanedCnpj.length === 14) {
        params.append('cnpj', cleanedCnpj);
      }
    }

    // Município: envia como está
    if (filters.municipio) {
      params.append('municipio', filters.municipio);
    }

    // UF: converte para uppercase
    if (filters.uf) {
      params.append('uf', filters.uf.toUpperCase());
    }

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await apiClient.get<PaginatedLancamentosResponse>(
      `/lancamentos?${params.toString()}`,
    );
    return response.data;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message);
  }
}

export async function fetchLancamento(id: string): Promise<Lancamento> {
  try {
    const response = await apiClient.get<Lancamento>(`/lancamentos/${id}`);
    return response.data;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message);
  }
}

export async function fetchLancamentosStats(
  filters: LancamentosFilters = {},
): Promise<LancamentosStats> {
  try {
    const params = new URLSearchParams();

    if (filters.ano) params.append('ano', filters.ano.toString());
    if (filters.mes) params.append('mes', filters.mes.toString());
    if (filters.tpRepasse) params.append('tpRepasse', filters.tpRepasse);
    if (filters.banco) params.append('banco', filters.banco);
    if (filters.agencia) params.append('agencia', filters.agencia);
    if (filters.conta) params.append('conta', filters.conta);
    if (filters.search) params.append('search', filters.search);

    // CNPJ: Strip formatting e validar 14 dígitos
    if (filters.cnpj) {
      const cleanedCnpj = filters.cnpj.replace(/\D/g, ''); // Remove não-dígitos
      if (cleanedCnpj.length === 14) {
        params.append('cnpj', cleanedCnpj);
      }
    }

    // Município: envia como está
    if (filters.municipio) {
      params.append('municipio', filters.municipio);
    }

    // UF: converte para uppercase
    if (filters.uf) {
      params.append('uf', filters.uf.toUpperCase());
    }

    const queryString = params.toString();
    const url = queryString
      ? `/lancamentos/stats?${queryString}`
      : '/lancamentos/stats';

    const response = await apiClient.get<LancamentosStats>(url);
    return response.data;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message);
  }
}

// Helpers
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatCNPJ(cnpj: string): string {
  if (!cnpj || cnpj.length !== 14) return cnpj;
  // 12345678000199 -> 12.345.678/0001-99
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

export function formatDate(date: Date | string | undefined): string {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}
