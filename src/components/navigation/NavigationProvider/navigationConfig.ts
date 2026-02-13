/**
 * SAFISAUDE - Navigation Configuration
 * FASE 4.2 - Role-Based Navigation
 *
 * Defines navigation items for each user role
 * Each role has main items, bottom items, and mobile items (max 5)
 */

import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Shield,
  Settings,
  User,
  HelpCircle,
  Home,
  Plus,
  Menu,
  FileText,
  Download,
  TrendingUp,
  Eye,
  Building2,
} from 'lucide-react';

import { NavigationConfig, UserRole } from '@/types/navigation';

/**
 * Get navigation configuration for a specific user role
 *
 * @param role - The user's role
 * @returns NavigationConfig with main, bottom, and mobile items
 */
export function getNavigationConfig(role: UserRole): NavigationConfig {
  switch (role) {
    case 'SUPER_ADMIN':
      return getSuperAdminConfig();
    case 'SUPORTE_ADMIN':
      return getSuporteAdminConfig();
    case 'FINANCEIRO_ADMIN':
      return getFinanceiroAdminConfig();
    case 'SECRETARIO':
      return getSecretarioConfig();
    case 'FINANCEIRO':
      return getFinanceiroConfig();
    case 'VISUALIZADOR':
      return getVisualizadorConfig();
    default:
      // Fallback to minimal config
      return {
        main: [],
        bottom: [],
        mobile: [],
      };
  }
}

/**
 * SUPER_ADMIN Navigation Config
 * Full access to all system features including tenant and user management
 */
function getSuperAdminConfig(): NavigationConfig {
  return {
    main: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard',
      },
      {
        id: 'clientes',
        label: 'Clientes',
        icon: Building2,
        path: '/clientes',
        submenu: [
          { label: 'Todos Clientes', path: '/clientes' },
          { label: 'Novo Cliente', path: '/clientes/novo', highlight: true },
        ],
      },
      {
        id: 'usuarios',
        label: 'Usuarios',
        icon: Users,
        path: '/usuarios',
        submenu: [
          { label: 'Todos Usuarios', path: '/usuarios' },
          { label: 'Novo Usuario', path: '/usuarios/novo', highlight: true },
        ],
      },
      {
        id: 'transacoes',
        label: 'Transacoes',
        icon: CreditCard,
        path: '/transacoes',
        badge: { count: 12, variant: 'warning' },
      },
      {
        id: 'lancamentos',
        label: 'Lançamentos',
        icon: FileText,
        path: '/lancamentos',
      },
    ],
    bottom: [
      {
        id: 'perfil',
        label: 'Meu Perfil',
        icon: User,
        path: '/perfil',
      },
      {
        id: 'ajuda',
        label: 'Ajuda',
        icon: HelpCircle,
        path: '/ajuda',
      },
    ],
    mobile: [
      { id: 'inicio', label: 'Inicio', icon: Home, path: '/dashboard' },
      {
        id: 'clientes-mobile',
        label: 'Clientes',
        icon: Building2,
        path: '/clientes',
      },
      { id: 'novo', label: 'Novo', icon: Plus, path: '/clientes/novo', primary: true },
      {
        id: 'usuarios-mobile',
        label: 'Usuarios',
        icon: Users,
        path: '/usuarios',
      },
      { id: 'menu', label: 'Menu', icon: Menu, path: '#' },
    ],
  };
}

/**
 * SUPORTE_ADMIN Navigation Config
 * Platform support administrator - helps clients with issues and support requests
 */
function getSuporteAdminConfig(): NavigationConfig {
  return {
    main: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard',
      },
      {
        id: 'usuarios',
        label: 'Usuarios',
        icon: Users,
        path: '/usuarios',
        submenu: [
          { label: 'Todos Usuarios', path: '/usuarios' },
          { label: 'Por Cliente', path: '/usuarios?role=SECRETARIO' },
          { label: 'Ativos', path: '/usuarios?ativo=true' },
        ],
      },
      {
        id: 'tickets',
        label: 'Suporte',
        icon: HelpCircle,
        path: '/suporte',
        submenu: [
          { label: 'Tickets Abertos', path: '/suporte?status=aberto', highlight: true },
          { label: 'Meus Tickets', path: '/suporte?assigned=me' },
          { label: 'Resolvidos', path: '/suporte?status=resolvido' },
        ],
      },
    ],
    bottom: [
      {
        id: 'perfil',
        label: 'Meu Perfil',
        icon: User,
        path: '/perfil',
      },
      {
        id: 'ajuda',
        label: 'Ajuda',
        icon: HelpCircle,
        path: '/ajuda',
      },
    ],
    mobile: [
      { id: 'inicio', label: 'Inicio', icon: Home, path: '/dashboard' },
      {
        id: 'usuarios-mobile',
        label: 'Usuarios',
        icon: Users,
        path: '/usuarios',
      },
      { id: 'suporte', label: 'Suporte', icon: HelpCircle, path: '/suporte', primary: true },
      {
        id: 'suporte-menu',
        label: 'Menu',
        icon: Menu,
        path: '#',
      },
    ],
  };
}

/**
 * FINANCEIRO_ADMIN Navigation Config
 * Platform financial administrator - manages financial operations across tenants
 */
function getFinanceiroAdminConfig(): NavigationConfig {
  return {
    main: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard',
      },
      {
        id: 'transacoes',
        label: 'Transacoes',
        icon: CreditCard,
        path: '/transacoes',
        submenu: [
          { label: 'Todas Transacoes', path: '/transacoes/todas' },
          { label: 'Pendentes', path: '/transacoes/pendentes', highlight: true },
          { label: 'Aprovadas', path: '/transacoes/aprovadas' },
          { label: 'Rejeitadas', path: '/transacoes/rejeitadas' },
        ],
      },
      {
        id: 'lancamentos',
        label: 'Lançamentos',
        icon: FileText,
        path: '/lancamentos',
      },
      {
        id: 'analises',
        label: 'Analises',
        icon: TrendingUp,
        path: '/analises',
      },
    ],
    bottom: [
      {
        id: 'perfil',
        label: 'Meu Perfil',
        icon: User,
        path: '/perfil',
      },
      {
        id: 'ajuda',
        label: 'Ajuda',
        icon: HelpCircle,
        path: '/ajuda',
      },
    ],
    mobile: [
      { id: 'inicio', label: 'Inicio', icon: Home, path: '/dashboard' },
      {
        id: 'transacoes-mobile',
        label: 'Transacoes',
        icon: CreditCard,
        path: '/transacoes',
      },
      { id: 'novo', label: 'Novo', icon: Plus, path: '/transacoes/novo', primary: true },
      {
        id: 'analises-mobile',
        label: 'Analises',
        icon: TrendingUp,
        path: '/analises',
      },
      { id: 'menu', label: 'Menu', icon: Menu, path: '#' },
    ],
  };
}

/**
 * SECRETARIO Navigation Config
 * Client administrator - manages users and transactions within their tenant
 */
function getSecretarioConfig(): NavigationConfig {
  return {
    main: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard',
      },
      {
        id: 'usuarios',
        label: 'Usuarios',
        icon: Users,
        path: '/usuarios',
        submenu: [
          { label: 'Todos Usuarios', path: '/usuarios' },
          { label: 'Novo Usuario', path: '/usuarios/novo', highlight: true },
        ],
      },
      {
        id: 'transacoes',
        label: 'Transacoes',
        icon: CreditCard,
        path: '/transacoes',
        badge: { count: 8, variant: 'warning' },
      },
      {
        id: 'lancamentos',
        label: 'Lançamentos',
        icon: FileText,
        path: '/lancamentos',
      },
    ],
    bottom: [
      {
        id: 'perfil',
        label: 'Meu Perfil',
        icon: User,
        path: '/perfil',
      },
      {
        id: 'ajuda',
        label: 'Ajuda',
        icon: HelpCircle,
        path: '/ajuda',
      },
    ],
    mobile: [
      { id: 'inicio', label: 'Inicio', icon: Home, path: '/dashboard' },
      {
        id: 'usuarios-mobile',
        label: 'Usuarios',
        icon: Users,
        path: '/usuarios',
        badge: { count: 3, variant: 'info' },
      },
      { id: 'novo', label: 'Novo', icon: Plus, path: '/usuarios/novo', primary: true },
      {
        id: 'transacoes-mobile',
        label: 'Transacoes',
        icon: CreditCard,
        path: '/transacoes',
        badge: { count: 8, variant: 'warning' },
      },
      { id: 'menu', label: 'Menu', icon: Menu, path: '#' },
    ],
  };
}

/**
 * FINANCEIRO Navigation Config
 * Focus on transactions, reports, analytics, and data export
 */
function getFinanceiroConfig(): NavigationConfig {
  return {
    main: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard',
      },
      {
        id: 'transacoes',
        label: 'Transacoes',
        icon: CreditCard,
        path: '/transacoes',
        badge: { count: 15, variant: 'info' },
        submenu: [
          { label: 'Todas Transacoes', path: '/transacoes/todas' },
          { label: 'Pendentes', path: '/transacoes/pendentes', highlight: true },
          { label: 'Aprovadas', path: '/transacoes/aprovadas' },
          { label: 'Rejeitadas', path: '/transacoes/rejeitadas' },
        ],
      },
      {
        id: 'lancamentos',
        label: 'Lançamentos',
        icon: FileText,
        path: '/lancamentos',
      },
      {
        id: 'analises',
        label: 'Analises',
        icon: TrendingUp,
        path: '/analises',
      },
      {
        id: 'exportar',
        label: 'Exportar Dados',
        icon: Download,
        path: '/exportar',
        highlight: true,
      },
    ],
    bottom: [
      {
        id: 'perfil',
        label: 'Meu Perfil',
        icon: User,
        path: '/perfil',
      },
      {
        id: 'ajuda',
        label: 'Ajuda',
        icon: HelpCircle,
        path: '/ajuda',
      },
    ],
    mobile: [
      { id: 'inicio', label: 'Inicio', icon: Home, path: '/dashboard' },
      {
        id: 'transacoes-mobile',
        label: 'Transacoes',
        icon: CreditCard,
        path: '/transacoes',
        badge: { count: 15, variant: 'info' },
      },
      { id: 'novo', label: 'Novo', icon: Plus, path: '/transacoes/novo', primary: true },
      {
        id: 'exportar-mobile',
        label: 'Exportar',
        icon: Download,
        path: '/exportar',
        highlight: true,
      },
      { id: 'menu', label: 'Menu', icon: Menu, path: '#' },
    ],
  };
}

/**
 * VISUALIZADOR Navigation Config
 * Read-only access to dashboards and reports
 */
function getVisualizadorConfig(): NavigationConfig {
  return {
    main: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard',
      },
      {
        id: 'lancamentos',
        label: 'Lançamentos',
        icon: FileText,
        path: '/lancamentos',
      },
    ],
    bottom: [
      {
        id: 'perfil',
        label: 'Meu Perfil',
        icon: User,
        path: '/perfil',
      },
      {
        id: 'ajuda',
        label: 'Ajuda',
        icon: HelpCircle,
        path: '/ajuda',
      },
    ],
    mobile: [
      { id: 'inicio', label: 'Inicio', icon: Home, path: '/dashboard' },
      {
        id: 'lancamentos-mobile',
        label: 'Lançamentos',
        icon: FileText,
        path: '/lancamentos',
      },
      {
        id: 'perfil-mobile',
        label: 'Perfil',
        icon: User,
        path: '/perfil',
        primary: true,
      },
      {
        id: 'ajuda-mobile',
        label: 'Ajuda',
        icon: HelpCircle,
        path: '/ajuda',
      },
      { id: 'menu', label: 'Menu', icon: Menu, path: '#' },
    ],
  };
}

/**
 * Get role display name in Portuguese
 *
 * @param role - User role
 * @returns Display name
 */
export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    SUPER_ADMIN: 'Super Administrador',
    SUPORTE_ADMIN: 'Administrador de Suporte',
    FINANCEIRO_ADMIN: 'Financeiro Administrativo',
    SECRETARIO: 'Secretário',
    FINANCEIRO: 'Financeiro',
    VISUALIZADOR: 'Visualizador',
  };
  return names[role] || role;
}
