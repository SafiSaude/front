'use client';

/**
 * SAFISAUDE - Sidebar Footer Component
 * FASE 4.4 - Bottom Navigation Items
 *
 * Contains settings, help, and other bottom-aligned navigation items
 */

import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigation } from '../NavigationProvider/useNavigation';
import { SidebarItem } from './SidebarItem';

/**
 * SidebarFooter Component
 *
 * Renders bottom navigation items (Settings, Help, etc.) and logout button
 */
export function SidebarFooter() {
  const { navigation, isCollapsed } = useNavigation();
  const { logout } = useAuth();

  return (
    <div
      className="border-t border-gray-200 px-2 py-4 space-y-1 mt-auto"
      role="navigation"
      aria-label="Menu secundario"
    >
      {/* Bottom navigation items */}
      {navigation.bottom && navigation.bottom.length > 0 && (
        <>
          {navigation.bottom.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </>
      )}

      {/* Logout button */}
      <button
        onClick={logout}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg w-full',
          'text-gray-700 hover:text-error-600 hover:bg-error-50',
          'transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2'
        )}
        title="Sair do sistema"
      >
        <LogOut className="h-5 w-5 flex-shrink-0" />
        <span className={cn('flex-1 text-sm text-left', isCollapsed && 'hidden')}>Sair</span>
      </button>
    </div>
  );
}
