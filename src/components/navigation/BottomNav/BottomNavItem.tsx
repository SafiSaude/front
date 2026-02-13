'use client';

/**
 * SAFISAUDE - Bottom Navigation Item Component
 * FASE 4.5 - Mobile Navigation Item
 *
 * Individual navigation item for the bottom navigation bar.
 * Supports badges, primary action styling, and active states.
 */

import Link from 'next/link';
import type { NavigationItem } from '@/types/navigation';
import { cn } from '@/lib/utils';
import { SidebarBadge } from '../Sidebar/SidebarBadge';

interface BottomNavItemProps {
  /** Navigation item configuration */
  item: NavigationItem;
  /** Whether this item is currently active */
  isActive: boolean;
}

/**
 * BottomNavItem Component
 *
 * Renders a single bottom navigation item with icon, label, and optional badge.
 * Primary items have elevated, highlighted styling.
 */
export function BottomNavItem({ item, isActive }: BottomNavItemProps) {
  const isPrimary = item.primary; // Special styling for primary action
  const Icon = item.icon;

  // Handle menu item that opens a drawer/modal (path = '#')
  const isMenuTrigger = item.path === '#';

  const itemContent = (
    <>
      {/* Icon with badge */}
      <div className="relative">
        <Icon
          className={cn(
            'h-6 w-6',
            isPrimary && 'h-7 w-7'
          )}
          strokeWidth={isActive || isPrimary ? 2.5 : 2}
        />
        {item.badge && (
          <div className="absolute -top-2 -right-2">
            <SidebarBadge badge={item.badge} size="sm" />
          </div>
        )}
      </div>

      {/* Label */}
      <span
        className={cn(
          'text-xs font-medium truncate max-w-full',
          isPrimary && 'text-white'
        )}
      >
        {item.label}
      </span>
    </>
  );

  const baseClasses = cn(
    // Layout
    'flex flex-col items-center justify-center',
    'min-w-[64px] gap-1 py-2 px-3 rounded-xl',
    // Transitions and interactions
    'transition-all duration-150 active:scale-95',
    // Focus styles for accessibility
    'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
    // Primary button: highlighted, elevated, larger
    isPrimary && [
      'bg-primary-600 text-white shadow-lg',
      'scale-110 -mt-4', // Elevated above other items
      'hover:bg-primary-700',
    ],
    // Non-primary active: underline style
    !isPrimary && isActive && [
      'text-primary-600',
      'border-b-2 border-primary-600',
    ],
    // Non-primary inactive: gray text
    !isPrimary && !isActive && [
      'text-gray-600',
      'hover:text-gray-900 hover:bg-gray-50',
    ],
    // Disabled state
    item.disabled && 'opacity-50 pointer-events-none'
  );

  // If it's a menu trigger, render a button instead of a link
  if (isMenuTrigger) {
    return (
      <button
        type="button"
        className={baseClasses}
        title={item.label}
        aria-label={item.label}
        disabled={item.disabled}
      >
        {itemContent}
      </button>
    );
  }

  return (
    <Link
      href={item.path}
      className={baseClasses}
      title={item.label}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
    >
      {itemContent}
    </Link>
  );
}
