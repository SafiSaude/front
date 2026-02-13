'use client';

/**
 * SAFISAUDE - Sidebar Header Component
 * FASE 4.4 - Sidebar Header with Logo and Toggle
 *
 * Contains the SAFISAUDE logo and collapse toggle button
 */

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigation } from '../NavigationProvider/useNavigation';
import { cn } from '@/lib/utils';

/**
 * SidebarHeader Component
 *
 * Displays the logo and collapse/expand toggle button
 */
export function SidebarHeader() {
  const { isCollapsed, hydrated, toggleCollapse } = useNavigation();

  return (
    <div
      className={cn(
        'h-16 flex items-center border-b border-gray-200',
        'transition-all duration-300',
        (hydrated && isCollapsed) ? 'justify-center px-2' : 'justify-between px-4'
      )}
    >
      {/* Logo */}
      <Link
        href="/dashboard"
        className={cn(
          'flex items-center justify-center',
          'transition-all duration-300 overflow-hidden',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
          'rounded-lg',
          (hydrated && isCollapsed) ? 'w-10' : 'w-auto'
        )}
        title="SAFISAUDE - Ir para Dashboard"
        aria-label="SAFISAUDE - Ir para Dashboard"
      >
        {/* Always render the expanded logo, hide with CSS when collapsed after hydration */}
        <Image
          src="/logo_safisus.png"
          alt="SAFISUS - Saúde Financeira do SUS"
          width={140}
          height={40}
          className={cn('object-contain', (hydrated && isCollapsed) && 'hidden')}
          priority
        />
      </Link>

      {/* Toggle Button - Hidden when collapsed, shown on hover or accessible */}
      {!(hydrated && isCollapsed) && (
        <button
          onClick={toggleCollapse}
          className={cn(
            'p-1.5 rounded-lg transition-colors',
            'hover:bg-gray-100 active:bg-gray-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
            'text-gray-500 hover:text-gray-700'
          )}
          aria-label="Colapsar sidebar"
          title="Colapsar sidebar (Ctrl+B)"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      )}

      {/* Expand button when collapsed - positioned as part of the header */}
      {(hydrated && isCollapsed) && (
        <button
          onClick={toggleCollapse}
          className={cn(
            'absolute -right-3 top-5 z-50',
            'w-6 h-6 rounded-full',
            'bg-white border border-gray-200 shadow-sm',
            'flex items-center justify-center',
            'hover:bg-gray-50 active:bg-gray-100',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
            'transition-colors'
          )}
          aria-label="Expandir sidebar"
          title="Expandir sidebar (Ctrl+B)"
        >
          <ChevronRight className="h-3.5 w-3.5 text-gray-600" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
