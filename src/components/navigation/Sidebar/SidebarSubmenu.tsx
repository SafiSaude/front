'use client';

/**
 * SAFISAUDE - Sidebar Submenu Component
 * FASE 4.4 - Submenu Items Container
 *
 * Renders submenu items under a parent navigation item
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavigationSubmenuItem } from '@/types/navigation';
import { cn } from '@/lib/utils';

interface SidebarSubmenuProps {
  /** Array of submenu items to render */
  items: NavigationSubmenuItem[];
}

/**
 * SidebarSubmenu Component
 *
 * Renders a list of submenu items with proper indentation and active states
 */
export function SidebarSubmenu({ items }: SidebarSubmenuProps) {
  const pathname = usePathname();

  return (
    <div className="ml-8 mt-1 space-y-0.5" role="menu">
      {items.map((subitem) => {
        const isActive =
          pathname === subitem.path || pathname.startsWith(subitem.path + '/');

        return (
          <Link
            key={subitem.id || subitem.path}
            href={subitem.path}
            role="menuitem"
            className={cn(
              // Layout
              'block px-3 py-2 text-sm rounded-lg',
              // Transitions
              'transition-colors duration-150',
              // Focus states
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
              // Active state
              isActive && 'bg-primary-100 text-primary-700 font-medium',
              // Inactive state
              !isActive && 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              // Disabled state
              subitem.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
              // Highlight state (border indicator)
              subitem.highlight && 'border-l-2 border-primary-600 pl-2.5'
            )}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={subitem.disabled}
          >
            {subitem.label}
          </Link>
        );
      })}
    </div>
  );
}
