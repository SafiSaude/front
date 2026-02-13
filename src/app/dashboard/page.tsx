'use client';

/**
 * SAFISAUDE - Dashboard Page
 * FASE 3.4 - Dashboard Role-Based
 *
 * Main application dashboard with role-based content
 * Requires authentication to access
 */

import { useAuth, useRequireAuth } from '@/context/AuthContext';
import { DashboardWrapper, DashboardHeader } from '@/components/dashboard';

export default function DashboardPage() {
  // Protect this route - redirects to login if not authenticated
  useRequireAuth();

  const { user, loading, logout } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-950"></div>
          <p className="text-gray-600 text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  // If no user after loading, redirect will happen via useRequireAuth
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-950"></div>
          <p className="text-gray-600 text-sm">Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <DashboardHeader user={user} onLogout={logout} />

      {/* Main Content - Role-Based Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardWrapper user={user} />
      </div>
    </main>
  );
}
