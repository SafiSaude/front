/**
 * SAFISAUDE - RoleBadge Component
 * FASE 3.4 - Dashboard Role-Based
 *
 * Displays user role with appropriate styling and icon
 */

import React from 'react';
import { UserRole } from '@/types/auth';

interface RoleBadgeProps {
  role: UserRole;
  size?: 'sm' | 'md' | 'lg';
}

const roleBadgeConfig: Record<UserRole, { bg: string; text: string; label: string; icon: string }> = {
  [UserRole.SUPER_ADMIN]: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    label: 'Super Admin',
    icon: '🔐',
  },
  [UserRole.SUPORTE_ADMIN]: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    label: 'Suporte Admin',
    icon: '🆘',
  },
  [UserRole.FINANCEIRO_ADMIN]: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    label: 'Financeiro Admin',
    icon: '💳',
  },
  [UserRole.SECRETARIO]: {
    bg: 'bg-primary-100',
    text: 'text-primary-900',
    label: 'Secretário',
    icon: '👨‍💼',
  },
  [UserRole.FINANCEIRO]: {
    bg: 'bg-success-100',
    text: 'text-success-800',
    label: 'Financeiro',
    icon: '💰',
  },
  [UserRole.VISUALIZADOR]: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    label: 'Visualizador',
    icon: '👁️',
  },
};

export default function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
  const config = roleBadgeConfig[role];

  if (!config) {
    return (
      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
        Desconhecido
      </span>
    );
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${config.bg} ${config.text} ${sizeClasses[size]} font-medium rounded-full`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
