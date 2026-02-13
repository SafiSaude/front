'use client';

/**
 * SAFISAUDE - Bottom Navigation Component
 * FASE 4.5 - Mobile Bottom Navigation
 *
 * Fixed bottom navigation bar for mobile devices.
 * Displays up to 5 navigation items with support for badges and primary action.
 * Respects safe areas for devices with notches.
 */

import { usePathname } from 'next/navigation';
import { useNavigation } from '../NavigationProvider/useNavigation';
import { cn } from '@/lib/utils';
import { BottomNavItem } from './BottomNavItem';

/**
 * BottomNav Component
 *
 * Mobile-only bottom navigation bar with role-based items.
 * Hidden on tablet (md) and desktop (lg) breakpoints.
 */
export function BottomNav() {
  const pathname = usePathname();
  const { navigation } = useNavigation();

  // Use mobile items if available, otherwise take first 5 from main
  const mobileItems = navigation.mobile?.length
    ? navigation.mobile
    : navigation.main.slice(0, 5);

  // Don't render if no items
  if (!mobileItems.length) {
    return null;
  }

  return (
    <nav
      className={cn(
        // Positioning and layout
        'fixed bottom-0 left-0 right-0 z-50',
        // Background and border
        'bg-white border-t border-gray-200 shadow-lg',
        // Only show on mobile (hidden on md and above)
        'md:hidden',
        // Safe area padding for devices with notches/home indicators
        'pb-safe'
      )}
      role="navigation"
      aria-label="Navegacao mobile"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {mobileItems.map((item) => (
          <BottomNavItem
            key={item.id}
            item={item}
            isActive={pathname === item.path || pathname.startsWith(`${item.path}/`)}
          />
        ))}
      </div>
    </nav>
  );
}
