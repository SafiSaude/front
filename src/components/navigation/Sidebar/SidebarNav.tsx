'use client';

/**
 * SAFISAUDE - Sidebar Navigation Component
 * FASE 4.4 - Main Navigation List
 *
 * Renders the main navigation items from the navigation context
 */

import { useNavigation } from '../NavigationProvider/useNavigation';
import { SidebarItem } from './SidebarItem';

/**
 * SidebarNav Component
 *
 * Scrollable container for main navigation items
 */
export function SidebarNav() {
  const { navigation } = useNavigation();

  return (
    <nav
      className="flex-1 overflow-y-auto px-2 py-4 space-y-1"
      aria-label="Menu principal"
    >
      {navigation.main.map((item) => (
        <SidebarItem key={item.id} item={item} />
      ))}
    </nav>
  );
}
