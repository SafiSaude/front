'use client';

/**
 * SAFISAUDE - Authentication Context
 * FASE 3.2 - Frontend Infrastructure
 *
 * Provides authentication state and methods throughout the application
 * Handles login, logout, token refresh, and user state management
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import {
  User,
  LoginCredentials,
  AuthContextType,
} from '@/types/auth';
import {
  login as apiLogin,
  logout as apiLogout,
  refreshToken as apiRefreshToken,
  initializeAuth,
  shouldRefreshToken,
  getTimeUntilExpiration,
} from '@/lib/auth-api';

// Create context with undefined initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Refresh token 5 minutes before expiration
const REFRESH_BUFFER_MS = 5 * 60 * 1000;
// Minimum interval between refresh attempts
const MIN_REFRESH_INTERVAL_MS = 30 * 1000;

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication Provider Component
 * Wraps the application and provides auth state and methods
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshAttempt, setLastRefreshAttempt] = useState<number>(0);

  /**
   * Calculate if user is authenticated
   */
  const isAuthenticated = useMemo(() => {
    return user !== null;
  }, [user]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Refresh the authentication token
   */
  const refreshToken = useCallback(async (): Promise<void> => {
    // Prevent rapid refresh attempts
    const now = Date.now();
    if (now - lastRefreshAttempt < MIN_REFRESH_INTERVAL_MS) {
      return;
    }
    setLastRefreshAttempt(now);

    try {
      await apiRefreshToken();
      // Token refreshed successfully, user state remains unchanged
    } catch (err) {
      // Refresh failed, log out user
      setUser(null);
      setError('Sessao expirada. Faca login novamente.');
    }
  }, []);

  /**
   * Login with email and password
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiLogin(credentials);
      setUser(response.user);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(message);
      throw err; // Re-throw to allow component to handle
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await apiLogout();
    } catch (err) {
      // Log error but continue with logout
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { user: storedUser, isAuthenticated: isAuth } = initializeAuth();

        if (isAuth && storedUser) {
          setUser(storedUser);

          // Check if token needs refresh
          if (shouldRefreshToken()) {
            try {
              await refreshToken();
            } catch {
              // Silently fail, user will be logged out if refresh fails
            }
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Erro ao restaurar sessao');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Set up automatic token refresh
   * Refreshes token 5 minutes before expiration
   */
  useEffect(() => {
    if (!user) return;

    const scheduleRefresh = () => {
      const timeUntilExpiration = getTimeUntilExpiration();

      if (timeUntilExpiration <= 0) {
        // Token already expired
        logout();
        return;
      }

      // Calculate when to refresh (5 minutes before expiration)
      const refreshTime = Math.max(
        timeUntilExpiration - REFRESH_BUFFER_MS,
        MIN_REFRESH_INTERVAL_MS
      );

      const timeoutId = setTimeout(async () => {
        try {
          await refreshToken();
          // Schedule next refresh after successful refresh
          scheduleRefresh();
        } catch {
          // Refresh failed, user will be logged out
        }
      }, refreshTime);

      return timeoutId;
    };

    const timeoutId = scheduleRefresh();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [user, logout, refreshToken]);

  /**
   * Context value with memoization for performance
   */
  const contextValue = useMemo<AuthContextType>(() => ({
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    refreshToken,
    clearError,
  }), [user, loading, error, isAuthenticated, login, logout, refreshToken, clearError]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access authentication context
 * Must be used within an AuthProvider
 *
 * @throws Error if used outside AuthProvider
 * @returns AuthContextType with user state and auth methods
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

/**
 * Hook to check if user has a specific role
 *
 * @param allowedRoles - Array of roles that are allowed
 * @returns boolean indicating if user has one of the allowed roles
 */
export function useHasRole(allowedRoles: string[]): boolean {
  const { user } = useAuth();

  if (!user) return false;

  return allowedRoles.includes(user.role);
}

/**
 * Hook to require authentication
 * Redirects to login if not authenticated
 *
 * @param redirectTo - Optional custom redirect path after login
 */
export function useRequireAuth(redirectTo?: string): void {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated && typeof window !== 'undefined') {
      // Store intended destination
      if (redirectTo) {
        sessionStorage.setItem('safisaude_redirect_after_login', redirectTo);
      } else {
        const currentPath = window.location.pathname;
        if (currentPath !== '/login') {
          sessionStorage.setItem('safisaude_redirect_after_login', currentPath);
        }
      }

      // Redirect to login
      window.location.href = '/login';
    }
  }, [isAuthenticated, loading, redirectTo]);
}

export default AuthContext;
