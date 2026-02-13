/**
 * SAFISAUDE - Tenant (Client) Types
 * FASE 7.3 - Frontend Multi-Tenant
 *
 * Defines types for Secretaria de Saúde (tenant/client) management
 */

/**
 * Tenant interface representing a client/Secretaria de Saúde
 */
export interface Tenant {
  id: string;
  nome: string;
  cnpj: string;
  emailContato: string;
  cidade?: string;
  estado?: string;
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
  criadoPor?: string;
  atualizadoPor?: string;
}

/**
 * Secretario data for tenant creation
 */
export interface SecretarioCreateRequest {
  nome: string;
  email: string;
  senha: string;
}

/**
 * Request body for creating a new tenant with its first secretario
 */
export interface CreateTenantRequest {
  nome: string;
  cnpj: string;
  emailContato: string;
  cidade?: string;
  estado?: string;
  secretario?: SecretarioCreateRequest;
}

/**
 * Request body for updating a tenant
 */
export interface UpdateTenantRequest {
  nome?: string;
  cnpj?: string;
  emailContato?: string;
  cidade?: string;
  estado?: string;
  ativo?: boolean;
}

/**
 * API response for creating tenant with secretario
 */
export interface CreateTenantResponse {
  tenant: Tenant;
  secretario?: {
    id: string;
    email: string;
    nome: string;
    role: string;
    tenantId: string;
  };
}

/**
 * CNPJ validation
 */
export const CNPJ_PATTERN = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
export const CNPJ_ERROR_MESSAGE = 'CNPJ deve estar no formato 00.000.000/0000-00';

/**
 * Format CNPJ from unformatted string
 * @param cnpj - CNPJ without formatting (14 digits)
 * @returns Formatted CNPJ (XX.XXX.XXX/XXXX-XX)
 */
export function formatCNPJ(cnpj: string): string {
  if (!cnpj || cnpj.length !== 14) return cnpj;
  // 12345678000199 -> 12.345.678/0001-99
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

/**
 * Brazilian state codes
 */
export const BRAZILIAN_STATES = [
  { code: 'AC', name: 'Acre' },
  { code: 'AL', name: 'Alagoas' },
  { code: 'AP', name: 'Amapá' },
  { code: 'AM', name: 'Amazonas' },
  { code: 'BA', name: 'Bahia' },
  { code: 'CE', name: 'Ceará' },
  { code: 'DF', name: 'Distrito Federal' },
  { code: 'ES', name: 'Espírito Santo' },
  { code: 'GO', name: 'Goiás' },
  { code: 'MA', name: 'Maranhão' },
  { code: 'MT', name: 'Mato Grosso' },
  { code: 'MS', name: 'Mato Grosso do Sul' },
  { code: 'MG', name: 'Minas Gerais' },
  { code: 'PA', name: 'Pará' },
  { code: 'PB', name: 'Paraíba' },
  { code: 'PR', name: 'Paraná' },
  { code: 'PE', name: 'Pernambuco' },
  { code: 'PI', name: 'Piauí' },
  { code: 'RJ', name: 'Rio de Janeiro' },
  { code: 'RN', name: 'Rio Grande do Norte' },
  { code: 'RS', name: 'Rio Grande do Sul' },
  { code: 'RO', name: 'Rondônia' },
  { code: 'RR', name: 'Roraima' },
  { code: 'SC', name: 'Santa Catarina' },
  { code: 'SP', name: 'São Paulo' },
  { code: 'SE', name: 'Sergipe' },
  { code: 'TO', name: 'Tocantins' },
];
