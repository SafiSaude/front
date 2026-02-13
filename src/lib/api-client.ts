/**
 * SAFISAUDE - API Client
 * FASE 3.2 - Frontend Infrastructure
 *
 * Axios instance with JWT interceptors for authenticated API calls
 * Handles token injection, 401 errors, and automatic logout
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiErrorResponse } from '@/types/auth';

// Storage keys
const AUTH_TOKEN_KEY = 'safisaude_auth_token';
const AUTH_USER_KEY = 'safisaude_auth_user';
const AUTH_EXPIRES_KEY = 'safisaude_auth_expires';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const REQUEST_TIMEOUT = 30000; // 30 seconds

/**
 * Token storage helpers
 */
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

export const getStoredToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
};

export const clearAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

/**
 * User storage helpers
 */
export const setStoredUser = (user: object): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
};

export const getStoredUser = <T>(): T | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem(AUTH_USER_KEY);
    if (user) {
      try {
        return JSON.parse(user) as T;
      } catch {
        return null;
      }
    }
  }
  return null;
};

export const clearStoredUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_USER_KEY);
  }
};

/**
 * Token expiration helpers
 */
export const setTokenExpiration = (expiresIn: number): void => {
  if (typeof window !== 'undefined') {
    // expiresIn is in seconds, convert to timestamp
    const expiresAt = Date.now() + expiresIn * 1000;
    localStorage.setItem(AUTH_EXPIRES_KEY, expiresAt.toString());
  }
};

export const getTokenExpiration = (): number | null => {
  if (typeof window !== 'undefined') {
    const expires = localStorage.getItem(AUTH_EXPIRES_KEY);
    return expires ? parseInt(expires, 10) : null;
  }
  return null;
};

export const clearTokenExpiration = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_EXPIRES_KEY);
  }
};

/**
 * Check if token is expired or about to expire
 * @param bufferMinutes - Minutes before expiration to consider as "about to expire"
 */
export const isTokenExpired = (bufferMinutes: number = 5): boolean => {
  const expiresAt = getTokenExpiration();
  if (!expiresAt) return true;

  const bufferMs = bufferMinutes * 60 * 1000;
  return Date.now() >= expiresAt - bufferMs;
};

/**
 * Clear all auth data from storage
 */
export const clearAllAuthData = (): void => {
  clearAuthToken();
  clearStoredUser();
  clearTokenExpiration();
};

/**
 * Create Axios instance with default configuration
 */
const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Request Interceptor
   * Injects JWT token into Authorization header
   */
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getStoredToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  /**
   * Response Interceptor
   * Handles 401 errors and other API errors
   */
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        // Clear auth data
        clearAllAuthData();

        // Redirect to login page (only in browser)
        if (typeof window !== 'undefined') {
          // Store current path for redirect after login
          const currentPath = window.location.pathname;
          if (currentPath !== '/login') {
            sessionStorage.setItem('safisaude_redirect_after_login', currentPath);
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        console.error('Access forbidden:', error.response.data?.message);
        return Promise.reject(error);
      }

      // Handle 500 Internal Server Error
      if (error.response?.status === 500) {
        console.error('Server error:', error.response.data?.message);
        return Promise.reject(error);
      }

      // Handle network errors
      if (!error.response) {
        console.error('Network error - no response received');
        return Promise.reject(new Error('Erro de conexao. Verifique sua internet.'));
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * API Client instance
 * Use this for all authenticated API calls
 */
export const apiClient = createApiClient();

/**
 * Helper function to extract error message from API response
 */
export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    // Check for custom error message from API
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }

    // Check for standard HTTP error messages
    switch (axiosError.response?.status) {
      case 400:
        return 'Dados invalidos. Verifique as informacoes.';
      case 401:
        return 'Sessao expirada. Faca login novamente.';
      case 403:
        return 'Acesso negado. Voce nao tem permissao.';
      case 404:
        return 'Recurso nao encontrado.';
      case 409:
        return 'Conflito de dados. Este registro ja existe.';
      case 422:
        return 'Dados invalidos. Verifique o formulario.';
      case 500:
        return 'Erro interno do servidor. Tente novamente mais tarde.';
      default:
        return 'Ocorreu um erro inesperado.';
    }
  }

  // Handle non-Axios errors
  if (error instanceof Error) {
    return error.message;
  }

  return 'Ocorreu um erro inesperado.';
};

export default apiClient;
