'use client';

/**
 * SAFISAUDE - useNavigation Hook
 * FASE 4.3 - Navigation Hook
 *
 * Custom hook for accessing navigation context
 */

import { useContext } from 'react';
import { NavigationContext } from './NavigationContext';
import type { NavigationContextType } from '@/types/navigation';

/**
 * Hook to access navigation context
 *
 * @throws Error if used outside of NavigationProvider
 * @returns NavigationContextType
 */
export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }

  return context;
}
