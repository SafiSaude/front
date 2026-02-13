'use client';

/**
 * SAFISAUDE - Login Form Component
 * FASE 3.3 - Login Screen
 *
 * Handles user authentication with form validation,
 * loading states, and error display
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginFormData } from '@/lib/form-schemas';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const { login, error: authError, clearError } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setFormError(null);
    clearError();

    try {
      await login(data);
      // Redirect is handled automatically by the login page useEffect
    } catch (err: unknown) {
      // Error is already set in AuthContext, but we can also handle specific cases
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Erro ao fazer login. Verifique suas credenciais.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const displayError = formError || authError;

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-8">
      {/* Error Alert */}
      {displayError && (
        <div className="mb-6 bg-error-50 border-l-4 border-error-500 p-4 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-error-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-error-800">{displayError}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            disabled={isLoading}
            className={`mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-950 focus:border-transparent transition-colors ${
              errors.email
                ? 'border-error-500 bg-error-50'
                : 'border-gray-300 bg-white'
            } ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900"
          >
            Senha
          </label>
          <input
            {...register('password')}
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={isLoading}
            className={`mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-950 focus:border-transparent transition-colors ${
              errors.password
                ? 'border-error-500 bg-error-50'
                : 'border-gray-300 bg-white'
            } ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-error-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-950 hover:bg-primary-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary-950 focus:ring-offset-2"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
              Entrando...
            </span>
          ) : (
            'Entrar'
          )}
        </button>
      </form>
    </div>
  );
}

// Named export for backwards compatibility
export { LoginForm };
