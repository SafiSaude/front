/**
 * SAFISAUDE - Authentication API
 * FASE 3.2 - Frontend Infrastructure
 *
 * Functions for authentication operations (login, logout, refresh)
 */

import {
  apiClient,
  setAuthToken,
  getStoredToken,
  clearAllAuthData,
  setStoredUser,
  getStoredUser,
  setTokenExpiration,
  getTokenExpiration,
  isTokenExpired,
  getApiErrorMessage,
} from './api-client';
import {
  LoginCredentials,
  AuthResponseDto,
  RefreshResponseDto,
  User,
} from '@/types/auth';

/**
 * Login user with email and password
 *
 * @param credentials - Email and password
 * @returns Promise with user data and token
 * @throws Error with message if login fails
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponseDto> => {
  try {
    const response = await apiClient.post<AuthResponseDto>('/auth/login', credentials);
    const { accessToken, user, expiresIn } = response.data;

    // Store auth data
    setAuthToken(accessToken);
    setStoredUser(user);
    setTokenExpiration(expiresIn);

    return response.data;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message);
  }
};

/**
 * Refresh access token using httpOnly refresh cookie
 * The backend handles the refresh token via cookies
 *
 * @returns Promise with new access token
 * @throws Error if refresh fails
 */
export const refreshToken = async (): Promise<RefreshResponseDto> => {
  try {
    const response = await apiClient.post<RefreshResponseDto>('/auth/refresh', {}, {
      withCredentials: true, // Important: send cookies
    });

    const { accessToken, expiresIn } = response.data;

    // Update stored token and expiration
    setAuthToken(accessToken);
    setTokenExpiration(expiresIn);

    return response.data;
  } catch (error) {
    // Clear auth data on refresh failure
    clearAllAuthData();
    const message = getApiErrorMessage(error);
    throw new Error(message);
  }
};

/**
 * Logout user
 * Clears local storage and calls backend logout endpoint
 *
 * @returns Promise<void>
 */
export const logout = async (): Promise<void> => {
  try {
    // Call backend logout to invalidate refresh token
    await apiClient.post('/auth/logout', {}, {
      withCredentials: true, // Important: send cookies to clear
    });
  } catch (error) {
    // Log error but don't throw - we still want to clear local storage
    console.error('Logout API error:', error);
  } finally {
    // Always clear local auth data
    clearAllAuthData();
  }
};

/**
 * Get current user from localStorage
 *
 * @returns User object or null
 */
export const getCurrentUser = (): User | null => {
  return getStoredUser<User>();
};

/**
 * Check if user is authenticated
 * Verifies both token existence and expiration
 *
 * @returns boolean indicating authentication status
 */
export const isAuthenticated = (): boolean => {
  const token = getStoredToken();
  if (!token) return false;

  // Check if token is expired (with 5 minute buffer)
  return !isTokenExpired(5);
};

/**
 * Get stored authentication token
 *
 * @returns Token string or null
 */
export const getAuthToken = (): string | null => {
  return getStoredToken();
};

/**
 * Check if token needs refresh
 * Returns true if token will expire within the next 5 minutes
 *
 * @returns boolean
 */
export const shouldRefreshToken = (): boolean => {
  const token = getStoredToken();
  if (!token) return false;

  // Token should be refreshed if it expires within 5 minutes
  return isTokenExpired(5);
};

/**
 * Get time until token expiration in milliseconds
 *
 * @returns Number of milliseconds until expiration, or 0 if expired/no token
 */
export const getTimeUntilExpiration = (): number => {
  const expiresAt = getTokenExpiration();
  if (!expiresAt) return 0;

  const remaining = expiresAt - Date.now();
  return remaining > 0 ? remaining : 0;
};

/**
 * Initialize authentication state
 * Call this on app startup to restore auth state from storage
 *
 * @returns Object with user and isAuthenticated status
 */
export const initializeAuth = (): { user: User | null; isAuthenticated: boolean } => {
  const user = getCurrentUser();
  const authenticated = isAuthenticated();

  return {
    user: authenticated ? user : null,
    isAuthenticated: authenticated,
  };
};
