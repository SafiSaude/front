/**
 * SAFISAUDE - Navigation Provider Exports
 * FASE 4.3 - Navigation Provider Index
 *
 * Central export point for navigation provider components and utilities
 */

// Context and Provider
export { NavigationProvider, NavigationContext } from './NavigationContext';

// Hook for accessing navigation state
export { useNavigation } from './useNavigation';

// Navigation configuration utilities
export { getNavigationConfig, getRoleDisplayName } from './navigationConfig';

// Re-export types from types/navigation for convenience
export type {
  NavigationConfig,
  NavigationItem,
  NavigationSubmenuItem,
  NavigationBadge,
  NavigationContextType,
  NavigationState,
  BadgeVariant,
  UserRole,
} from '@/types/navigation';
