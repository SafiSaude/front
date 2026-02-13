'use client';

/**
 * SAFISAUDE - Main Content Wrapper
 * FASE 4.6 - Layout Integration
 *
 * Wrapper component that handles responsive margins based on sidebar state.
 * Adjusts left margin based on sidebar collapsed/expanded state.
 */

import { useNavigation } from './NavigationProvider/useNavigation';
import { cn } from '@/lib/utils';

interface MainContentProps {
  children: React.ReactNode;
}

/**
 * MainContent Component
 *
 * Wraps the main content area and adjusts margins based on sidebar state.
 * - Mobile: No left margin (sidebar hidden)
 * - Tablet/Desktop with sidebar collapsed: 64px left margin
 * - Desktop with sidebar expanded: 280px left margin
 */
export function MainContent({ children }: MainContentProps) {
  const { isCollapsed } = useNavigation();

  return (
    <main
      className={cn(
        // Full height with bottom padding for mobile nav
        'min-h-screen pb-20 md:pb-0',
        // Left margin adjusted by sidebar width on desktop/tablet
        // Collapsed: 64px (w-16), Expanded: 280px (w-70)
        'md:ml-16',
        !isCollapsed && 'lg:ml-70',
        isCollapsed && 'lg:ml-16',
        // Smooth transition for margin changes
        'transition-all duration-300'
      )}
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </div>
    </main>
  );
}
