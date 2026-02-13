/**
 * SAFISAUDE - Dashboard Header Component
 * FASE 4.6 - Layout Integration
 *
 * Simplified header component for dashboard views.
 * Logo is now in the sidebar; header focuses on page title and user actions.
 */

'use client';

import React from 'react';
import { LogOut, Menu } from 'lucide-react';
import { User } from '@/types/auth';
import { RoleBadge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  /** Current authenticated user */
  user: User;
  /** Logout handler function */
  onLogout: () => void;
  /** Optional page title to display */
  title?: string;
  /** Optional mobile menu toggle handler */
  onMenuToggle?: () => void;
}

/**
 * DashboardHeader Component
 *
 * Displays page title, user information, and actions.
 * Mobile-responsive with optional menu toggle button.
 */
export default function DashboardHeader({
  user,
  onLogout,
  title = 'Dashboard',
  onMenuToggle,
}: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-soft border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Title and mobile menu */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button (visible only on mobile) */}
            {onMenuToggle && (
              <button
                type="button"
                onClick={onMenuToggle}
                className={cn(
                  'md:hidden p-2 -ml-2 rounded-lg',
                  'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
                  'transition-colors duration-150',
                  'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                )}
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}

            {/* Page title */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {title}
            </h1>
          </div>

          {/* Right side - User info and logout */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* User info (hidden on very small screens) */}
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">{user.nome}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            {/* Role badge */}
            <RoleBadge role={user.role} size="sm" />

            {/* Logout button */}
            <button
              type="button"
              onClick={onLogout}
              className={cn(
                'flex items-center gap-2 px-3 py-2',
                'text-sm font-medium text-gray-700',
                'hover:text-error-600 hover:bg-error-50',
                'rounded-lg transition-colors duration-150',
                'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
              )}
              title="Sair do sistema"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
