import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { RootLayoutContent } from "@/components/layout/RootLayoutContent";

export const metadata: Metadata = {
  title: "SAFISAUDE - Gestor Financeiro",
  description: "Sistema de gestao financeira para secretarias de saude municipais",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // Required for safe area insets
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 antialiased">
        <ToastProvider>
          <AuthProvider>
            <RootLayoutContent>
              {children}
            </RootLayoutContent>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
