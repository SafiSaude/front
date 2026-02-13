/**
 * SAFISAUDE - Navigation Types
 * FASE 4.2 - Navigation System
 *
 * Comprehensive type definitions for the navigation system
 * including sidebar, bottom navigation, and mobile navigation
 */

import { LucideIcon } from 'lucide-react';

/**
 * User roles matching backend roles
 * Used for role-based navigation filtering
 * @deprecated Use UserRole from @/types/auth instead
 */
export type UserRole = 'SUPER_ADMIN' | 'SUPORTE_ADMIN' | 'FINANCEIRO_ADMIN' | 'SECRETARIO' | 'FINANCEIRO' | 'VISUALIZADOR';

/**
 * Badge variant for navigation items
 * - info: Blue, informational notifications
 * - warning: Orange, requires attention
 * - danger: Red, urgent/critical items
 * - success: Green, positive indicators
 */
export type BadgeVariant = 'info' | 'warning' | 'danger' | 'success';

/**
 * @deprecated Use BadgeVariant instead
 */
export type NavigationBadgeVariant = BadgeVariant;

/**
 * Badge configuration for navigation items
 */
export interface NavigationBadge {
  /** Number to display in the badge */
  count: number;
  /** Visual variant determining color */
  variant: BadgeVariant;
}

/**
 * Submenu item within a navigation item
 */
export interface NavigationSubmenuItem {
  /** Unique identifier for the submenu item */
  id?: string;
  /** Display text for the submenu item */
  label: string;
  /** Route path for navigation */
  path: string;
  /** Whether this item is disabled/inaccessible */
  disabled?: boolean;
  /** Whether to visually highlight this item */
  highlight?: boolean;
}

/**
 * Main navigation item structure
 */
export interface NavigationItem {
  /** Unique identifier for the item */
  id: string;
  /** Display text for the item */
  label: string;
  /** Route path for navigation */
  path: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Optional badge for notifications */
  badge?: NavigationBadge;
  /** Optional submenu items */
  submenu?: NavigationSubmenuItem[];
  /** Whether this item is disabled/inaccessible */
  disabled?: boolean;
  /** Whether to visually highlight this item */
  highlight?: boolean;
  /** Whether this is a primary action (mobile bottom nav center button) */
  primary?: boolean;
}

/**
 * Complete navigation structure for a user role
 */
export interface NavigationConfig {
  /** Main sidebar navigation items */
  main: NavigationItem[];
  /** Bottom sidebar items (profile, help, logout) */
  bottom: NavigationItem[];
  /** Mobile bottom navigation items (max 5 items) */
  mobile?: NavigationItem[];
}

/**
 * Navigation context state
 */
export interface NavigationState {
  /** Whether the sidebar is collapsed (icon-only mode) */
  isCollapsed: boolean;
  /** Whether the mobile menu is open */
  isMobileOpen: boolean;
  /** Currently active navigation item ID */
  activeItem: string | null;
  /** Array of expanded submenu item IDs */
  expandedItems: string[];
}

/**
 * Navigation context type with state and actions
 */
export interface NavigationContextType extends NavigationState {
  /** Current navigation configuration based on user role */
  navigation: NavigationConfig;
  /** Whether the component has completed hydration (client-side initialization) */
  hydrated: boolean;
  /** Toggle sidebar collapsed state */
  toggleCollapse: () => void;
  /** Toggle mobile menu open/closed */
  toggleMobile: () => void;
  /** Close mobile menu */
  closeMobile: () => void;
  /** Set the currently active navigation item */
  setActiveItem: (id: string | null) => void;
  /** Toggle submenu expanded state */
  toggleExpanded: (id: string) => void;
  /** Check if a submenu is expanded */
  isExpanded: (id: string) => boolean;
  /** Set sidebar collapsed state */
  setIsCollapsed: (collapsed: boolean) => void;
  /** Set mobile menu open state */
  setIsMobileOpen: (open: boolean) => void;
}

/**
 * Badge color configuration for UI rendering
 */
export const BadgeColors: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
  info: {
    bg: 'bg-info-100',
    text: 'text-info-700',
    border: 'border-info-200',
  },
  warning: {
    bg: 'bg-warning-100',
    text: 'text-warning-700',
    border: 'border-warning-200',
  },
  danger: {
    bg: 'bg-error-100',
    text: 'text-error-700',
    border: 'border-error-200',
  },
  success: {
    bg: 'bg-success-100',
    text: 'text-success-700',
    border: 'border-success-200',
  },
};
