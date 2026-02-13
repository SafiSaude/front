'use client';

/**
 * SAFISAUDE - Home Page
 * FASE 3.3 - Login Screen
 *
 * Landing page that redirects based on authentication status
 * Authenticated users go to dashboard, others to login
 */

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [isAuthenticated, loading, router]);

  // Show loading while determining auth state
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/logo_safisus.png"
          alt="SAFISAUDE"
          className="h-16 mb-2"
        />
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-200 border-t-primary-950"></div>
        <p className="text-gray-600 text-sm">Carregando...</p>
      </div>
    </main>
  );
}
