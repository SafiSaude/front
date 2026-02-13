'use client';

/**
 * SAFISAUDE - Navigation Context
 * FASE 4.3 - Navigation Provider
 *
 * React Context for managing navigation state across the application
 * Integrates with AuthContext for role-based navigation
 */

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAuth } from '@/context/AuthContext';
import { getNavigationConfig } from './navigationConfig';
import type {
  NavigationConfig,
  NavigationContextType,
  NavigationState,
  UserRole,
} from '@/types/navigation';
import { getStorageItem, setStorageItem } from '@/lib/utils';

/**
 * Storage key for sidebar collapse state
 */
const SIDEBAR_COLLAPSED_KEY = 'sidebar_collapsed';

/**
 * Default empty navigation for unauthenticated users
 */
const emptyNavigation: NavigationConfig = {
  main: [],
  bottom: [],
  mobile: [],
};

/**
 * Initial navigation state
 */
const initialState: NavigationState = {
  isCollapsed: false,
  isMobileOpen: false,
  activeItem: null,
  expandedItems: [],
};

/**
 * Navigation Context
 */
export const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

/**
 * Navigation Provider Props
 */
interface NavigationProviderProps {
  children: React.ReactNode;
  /** Optional custom navigation config (overrides role-based config) */
  customNavigation?: NavigationConfig;
}

/**
 * Navigation Provider Component
 *
 * Provides navigation state and actions to the entire application.
 * Automatically loads role-based navigation from user context.
 */
export function NavigationProvider({
  children,
  customNavigation,
}: NavigationProviderProps) {
  const { user } = useAuth();
  const [state, setState] = useState<NavigationState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  /**
   * Get navigation config based on user role
   * Uses customNavigation if provided, otherwise derives from user role
   */
  const navigation = useMemo<NavigationConfig>(() => {
    // Use custom navigation if provided
    if (customNavigation) {
      return customNavigation;
    }

    // Return empty navigation if no user
    if (!user) {
      return emptyNavigation;
    }

    // Get role-based navigation config
    return getNavigationConfig(user.role as UserRole);
  }, [user, customNavigation]);

  /**
   * Load collapsed state from localStorage on mount (after hydration)
   * This runs after the component is hydrated to prevent hydration mismatches
   */
  useEffect(() => {
    // Mark as hydrated after first render
    setHydrated(true);

    // Load collapsed state from localStorage
    const savedCollapsed = getStorageItem<boolean>(SIDEBAR_COLLAPSED_KEY);
    if (savedCollapsed !== null) {
      setState((prev) => ({ ...prev, isCollapsed: savedCollapsed }));
    }
  }, []);

  /**
   * Close mobile menu on route change (resize detection)
   * This effect handles closing the mobile menu when window resizes above mobile breakpoint
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && state.isMobileOpen) {
        setState((prev) => ({ ...prev, isMobileOpen: false }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [state.isMobileOpen]);

  /**
   * Toggle sidebar collapse
   */
  const toggleCollapse = useCallback(() => {
    setState((prev) => {
      const newCollapsed = !prev.isCollapsed;
      setStorageItem(SIDEBAR_COLLAPSED_KEY, newCollapsed);
      return { ...prev, isCollapsed: newCollapsed };
    });
  }, []);

  /**
   * Set sidebar collapsed state directly
   */
  const setIsCollapsed = useCallback((collapsed: boolean) => {
    setState((prev) => {
      setStorageItem(SIDEBAR_COLLAPSED_KEY, collapsed);
      return { ...prev, isCollapsed: collapsed };
    });
  }, []);

  /**
   * Toggle mobile menu
   */
  const toggleMobile = useCallback(() => {
    setState((prev) => ({ ...prev, isMobileOpen: !prev.isMobileOpen }));
  }, []);

  /**
   * Set mobile menu open state directly
   */
  const setIsMobileOpen = useCallback((open: boolean) => {
    setState((prev) => ({ ...prev, isMobileOpen: open }));
  }, []);

  /**
   * Close mobile menu
   */
  const closeMobile = useCallback(() => {
    setState((prev) => ({ ...prev, isMobileOpen: false }));
  }, []);

  /**
   * Set active navigation item
   */
  const setActiveItem = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, activeItem: id }));
  }, []);

  /**
   * Toggle expanded state for submenu items
   */
  const toggleExpanded = useCallback((id: string) => {
    setState((prev) => {
      const isCurrentlyExpanded = prev.expandedItems.includes(id);
      const expandedItems = isCurrentlyExpanded
        ? prev.expandedItems.filter((item) => item !== id)
        : [...prev.expandedItems, id];
      return { ...prev, expandedItems };
    });
  }, []);

  /**
   * Check if an item is expanded
   */
  const isExpanded = useCallback(
    (id: string) => {
      return state.expandedItems.includes(id);
    },
    [state.expandedItems]
  );

  /**
   * Context value with memoization for performance
   */
  const contextValue = useMemo<NavigationContextType>(
    () => ({
      ...state,
      navigation,
      hydrated,
      toggleCollapse,
      toggleMobile,
      closeMobile,
      setActiveItem,
      toggleExpanded,
      isExpanded,
      setIsCollapsed,
      setIsMobileOpen,
    }),
    [
      state,
      navigation,
      hydrated,
      toggleCollapse,
      toggleMobile,
      closeMobile,
      setActiveItem,
      toggleExpanded,
      isExpanded,
      setIsCollapsed,
      setIsMobileOpen,
    ]
  );

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}
