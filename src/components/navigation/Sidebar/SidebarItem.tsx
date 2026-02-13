'use client';

/**
 * SAFISAUDE - Sidebar Item Component
 * FASE 4.4 - Navigation Item with Submenu Support
 *
 * Individual navigation item that can contain a submenu
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import type { NavigationItem } from '@/types/navigation';
import { useNavigation } from '../NavigationProvider/useNavigation';
import { cn } from '@/lib/utils';
import { SidebarBadge } from './SidebarBadge';
import { SidebarSubmenu } from './SidebarSubmenu';
import { Tooltip } from '@/components/ui/Tooltip';

interface SidebarItemProps {
  /** Navigation item to render */
  item: NavigationItem;
}

/**
 * SidebarItem Component
 *
 * Renders a navigation item with optional submenu, badge, and active state
 */
export function SidebarItem({ item }: SidebarItemProps) {
  const { isCollapsed, hydrated, isExpanded, toggleExpanded } = useNavigation();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const hasSubmenu = item.submenu && item.submenu.length > 0;

  // Check if current path matches this item or its children
  const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
  const isSubmenuActive = item.submenu?.some(
    (sub) => pathname === sub.path || pathname.startsWith(sub.path + '/')
  );

  // Sync local state with context expanded state
  useEffect(() => {
    if (hasSubmenu) {
      setIsOpen(isExpanded(item.id));
    }
  }, [hasSubmenu, isExpanded, item.id]);

  // Auto-expand submenu if a child is active
  useEffect(() => {
    if (hasSubmenu && isSubmenuActive && !isCollapsed) {
      setIsOpen(true);
      if (!isExpanded(item.id)) {
        toggleExpanded(item.id);
      }
    }
  }, [hasSubmenu, isSubmenuActive, isCollapsed, isExpanded, toggleExpanded, item.id]);

  const handleToggleSubmenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    toggleExpanded(item.id);
  };

  // Base classes for all items
  const baseClasses = cn(
    'flex items-center gap-3 px-3 py-2.5 rounded-lg w-full',
    'transition-colors duration-150',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2'
  );

  // Active state classes
  const activeClasses = cn(
    isActive && 'bg-primary-50 text-primary-700 font-medium',
    isSubmenuActive && !isActive && 'text-primary-600',
    !isActive && !isSubmenuActive && 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
  );

  // Disabled state
  const disabledClasses = item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none';

  // Icon component
  const IconComponent = item.icon;

  // Determine if we should render in collapsed mode (only after hydration)
  const shouldRenderCollapsed = hydrated && isCollapsed;

  // Items with submenu
  if (hasSubmenu) {
    return (
      <>
        {/* Collapsed view - only render after hydration to prevent mismatch */}
        {shouldRenderCollapsed ? (
          <Tooltip text={item.label} side="right">
            <Link
              href={item.path}
              className={cn(baseClasses, activeClasses, disabledClasses, 'justify-center')}
              aria-current={isActive ? 'page' : undefined}
            >
              <IconComponent
                className={cn(
                  'h-5 w-5 flex-shrink-0',
                  isActive || isSubmenuActive ? 'text-primary-700' : 'text-gray-500'
                )}
                aria-hidden="true"
              />
              {item.badge && (
                <span className="absolute -top-1 -right-1">
                  <SidebarBadge badge={item.badge} size="sm" />
                </span>
              )}
            </Link>
          </Tooltip>
        ) : (
          /* Expanded view */
          <div>
            <button
              onClick={handleToggleSubmenu}
              className={cn(baseClasses, activeClasses, disabledClasses, 'justify-between')}
              aria-expanded={isOpen}
              aria-controls={`submenu-${item.id}`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <IconComponent
                  className={cn(
                    'h-5 w-5 flex-shrink-0',
                    isActive || isSubmenuActive ? 'text-primary-700' : 'text-gray-500'
                  )}
                  aria-hidden="true"
                />
                <span className="flex-1 text-sm truncate text-left">{item.label}</span>
                {item.badge && <SidebarBadge badge={item.badge} />}
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 flex-shrink-0 transition-transform duration-200',
                  'text-gray-400',
                  isOpen && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </button>

            {/* Submenu with animation */}
            <div
              id={`submenu-${item.id}`}
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              {item.submenu && <SidebarSubmenu items={item.submenu} />}
            </div>
          </div>
        )}
      </>
    );
  }

  // Simple link without submenu
  return shouldRenderCollapsed ? (
    <Tooltip text={item.label} side="right">
      <Link
        href={item.path}
        className={cn(baseClasses, activeClasses, disabledClasses, 'justify-center relative')}
        aria-current={isActive ? 'page' : undefined}
      >
        <IconComponent
          className={cn(
            'h-5 w-5 flex-shrink-0',
            isActive ? 'text-primary-700' : 'text-gray-500'
          )}
          aria-hidden="true"
        />
        {item.badge && (
          <span className="absolute -top-1 -right-1">
            <SidebarBadge badge={item.badge} size="sm" />
          </span>
        )}
      </Link>
    </Tooltip>
  ) : (
    <Link
      href={item.path}
      className={cn(baseClasses, activeClasses, disabledClasses)}
      aria-current={isActive ? 'page' : undefined}
    >
      <IconComponent
        className={cn(
          'h-5 w-5 flex-shrink-0',
          isActive ? 'text-primary-700' : 'text-gray-500'
        )}
        aria-hidden="true"
      />
      <span className="flex-1 text-sm truncate text-left">{item.label}</span>
      {item.badge && <SidebarBadge badge={item.badge} />}
    </Link>
  );
}
