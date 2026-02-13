'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NavigationProvider } from '@/components/navigation/NavigationProvider';
import { Sidebar } from '@/components/navigation/Sidebar';
import { BottomNav } from '@/components/navigation/BottomNav';
import { MainContent } from '@/components/navigation/MainContent';
import { ToastContainer } from '@/components/ui/Toast';

interface Props {
  children: React.ReactNode;
}

export function RootLayoutContent({ children }: Props) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted flag after component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Determinar se deve mostrar navegação (Sidebar/BottomNav)
  const isLoginPage = pathname === '/login';

  // Don't render anything until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  if (isLoginPage) {
    // Layout simples para login (sem navegação)
    return (
      <div className="w-full min-h-screen">
        {children}
        <ToastContainer />
      </div>
    );
  }

  // Layout com navegação para outras páginas
  return (
    <NavigationProvider>
      {/* Sidebar - Desktop & Tablet (hidden on mobile) */}
      <Sidebar />

      {/* Main Content with responsive margin adjustments */}
      <MainContent>
        {children}
      </MainContent>

      {/* Bottom Nav - Mobile Only (hidden on md+) */}
      <BottomNav />

      {/* Toast Notifications Container */}
      <ToastContainer />
    </NavigationProvider>
  );
}
