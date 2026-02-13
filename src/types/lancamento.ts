export interface Lancamento {
  id: string;
  tenantId: string | null;
  cnpj: string;

  // Processo
  nuProcesso?: string;
  nuPortaria?: string;
  dtPortaria?: Date | string;

  // Período
  ano: number;
  mes: number;
  nuCompetencia?: string;
  diaPagamento?: number;

  // Tipo e Repasse
  tpRepasse: string;
  nuOb?: string;
  coTipoRecurso?: string;
  tpRecursoProp?: string;
  recursoCOVIDOUNormal?: string;

  // Localização
  uf: string;
  coMunicipioIbge: string;
  municipio: string;

  // Entidade
  entidade?: string;

  // Classificação
  bloco?: string;
  componente?: string;
  programa?: string;
  nuProposta?: string;

  // Dados Bancários
  banco?: string;
  agencia?: string;
  conta?: string;

  // Valores
  valorBruto: number;
  desconto: number;
  valorLiquido: number;

  // Saldo
  dtSaldoConta?: Date | string;
  vlSaldoConta?: number;

  // Marcadores
  marcadorEmendaCOVID?: string;

  // Auditoria
  criadoEm: Date | string;
  criadoPor?: string;
  atualizadoEm: Date | string;
  atualizadoPor?: string;
}

export interface LancamentosFilters {
  ano?: number;
  mes?: number;
  tpRepasse?: string;
  banco?: string;
  agencia?: string;
  conta?: string;
  search?: string;
  cnpj?: string; // Filtro por CNPJ exato
  municipio?: string; // Filtro por município (busca parcial)
  uf?: string; // Filtro por UF (2 caracteres)
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedLancamentosResponse {
  data: Lancamento[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LancamentosStats {
  totalLancamentos: number;
  valorTotalBruto: number;
  valorTotalLiquido: number;
  periodoMaisRecente: { ano: number; mes: number };
  anos: number[];
  tiposRepasse: { tipo: string; total: number }[];
  contasBancarias: { banco: string; agencia: string; conta: string; total: number }[];
}

export const MESES = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
];
