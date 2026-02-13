/**
 * SAFISAUDE - Authentication Types
 * FASE 3.2 - Frontend Infrastructure
 *
 * Defines all authentication-related types, enums, and interfaces
 */

/**
 * User roles enum matching backend roles
 * - SUPER_ADMIN: Platform administrator (no tenant)
 * - SUPORTE_ADMIN: Platform support administrator (no tenant)
 * - FINANCEIRO_ADMIN: Platform financial administrator (no tenant)
 * - SECRETARIO: Client/Tenant administrator
 * - FINANCEIRO: Can create transactions (client/tenant)
 * - VISUALIZADOR: Can only view dashboards
 */
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SUPORTE_ADMIN = 'SUPORTE_ADMIN',
  FINANCEIRO_ADMIN = 'FINANCEIRO_ADMIN',
  SECRETARIO = 'SECRETARIO',
  FINANCEIRO = 'FINANCEIRO',
  VISUALIZADOR = 'VISUALIZADOR',
}

/**
 * User interface representing authenticated user data
 */
export interface User {
  id: string;
  email: string;
  nome: string;
  role: UserRole;
  tenantId?: string | null;
  ativo: boolean;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Backend response for successful login
 */
export interface AuthResponseDto {
  accessToken: string;
  user: User;
  expiresIn: number;
}

/**
 * Backend response for token refresh
 */
export interface RefreshResponseDto {
  accessToken: string;
  expiresIn: number;
}

/**
 * Auth context state and methods
 */
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

/**
 * Stored auth data in localStorage
 */
export interface StoredAuthData {
  accessToken: string;
  user: User;
  expiresAt: number; // Unix timestamp
}

/**
 * API error response structure
 */
export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
}

/**
 * Role display names for UI
 */
export const RoleDisplayNames: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: 'Super Admin',
  [UserRole.SUPORTE_ADMIN]: 'Suporte Admin',
  [UserRole.FINANCEIRO_ADMIN]: 'Financeiro Admin',
  [UserRole.SECRETARIO]: 'Secretário',
  [UserRole.FINANCEIRO]: 'Financeiro',
  [UserRole.VISUALIZADOR]: 'Visualizador',
};

/**
 * Role badge colors for UI components
 */
export const RoleBadgeColors: Record<UserRole, { bg: string; text: string; border: string }> = {
  [UserRole.SUPER_ADMIN]: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200',
  },
  [UserRole.SUPORTE_ADMIN]: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-200',
  },
  [UserRole.FINANCEIRO_ADMIN]: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    border: 'border-indigo-200',
  },
  [UserRole.SECRETARIO]: {
    bg: 'bg-primary-100',
    text: 'text-primary-900',
    border: 'border-primary-200',
  },
  [UserRole.FINANCEIRO]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
  },
  [UserRole.VISUALIZADOR]: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
  },
};
