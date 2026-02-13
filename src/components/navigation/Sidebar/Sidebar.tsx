'use client';

/**
 * SAFISAUDE - Sidebar Component
 * FASE 4.4 - Main Sidebar Container
 *
 * Fixed, collapsible sidebar for desktop and tablet screens.
 * Width: 280px expanded / 64px collapsed
 */

import { useEffect } from 'react';
import { useNavigation } from '../NavigationProvider/useNavigation';
import { cn } from '@/lib/utils';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNav } from './SidebarNav';
import { SidebarFooter } from './SidebarFooter';

/**
 * Sidebar Component
 *
 * Main sidebar container with keyboard shortcut support (Ctrl/Cmd + B)
 * Hidden on mobile, visible on md breakpoint and above
 */
export function Sidebar() {
  const { isCollapsed, hydrated, toggleCollapse } = useNavigation();

  // Keyboard shortcut: Ctrl/Cmd + B to toggle collapse
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleCollapse();
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [toggleCollapse]);

  return (
    <aside
      className={cn(
        // Positioning and layout
        'fixed left-0 top-0 z-40 h-screen',
        // Background and border
        'bg-gray-50 border-r border-gray-200',
        // Visibility - hidden on mobile, flex on medium screens and up
        'hidden md:flex flex-col',
        // Smooth transition for collapse animation
        'transition-all duration-300 ease-in-out',
        // Width based on collapsed state (only after hydration to prevent hydration mismatch)
        hydrated && isCollapsed ? 'w-16' : 'w-70'
      )}
      role="navigation"
      aria-label="Navegacao principal"
    >
      <SidebarHeader />
      <SidebarNav />
      <SidebarFooter />
    </aside>
  );
}
