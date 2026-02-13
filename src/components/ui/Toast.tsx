'use client';

/**
 * SAFISAUDE - Toast Notification Component
 * FASE 5.1 - Toast UI
 *
 * Displays toast notifications on screen
 */

import React, { useEffect } from 'react';
import { useToast, type Toast } from '@/context/ToastContext';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const toastConfig = {
  success: {
    bgColor: 'bg-success-50',
    borderColor: 'border-success-200',
    textColor: 'text-success-900',
    iconColor: 'text-success-600',
    Icon: CheckCircle,
  },
  error: {
    bgColor: 'bg-error-50',
    borderColor: 'border-error-200',
    textColor: 'text-error-900',
    iconColor: 'text-error-600',
    Icon: AlertCircle,
  },
  warning: {
    bgColor: 'bg-warning-50',
    borderColor: 'border-warning-200',
    textColor: 'text-warning-900',
    iconColor: 'text-warning-600',
    Icon: AlertTriangle,
  },
  info: {
    bgColor: 'bg-info-50',
    borderColor: 'border-info-200',
    textColor: 'text-info-900',
    iconColor: 'text-info-600',
    Icon: Info,
  },
};

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const config = toastConfig[toast.type];
  const { Icon } = config;

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(onClose, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, onClose]);

  return (
    <div
      className={`
        animate-slide-in-right
        flex items-start gap-3
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        border rounded-lg
        px-4 py-3
        shadow-md
        max-w-sm
      `}
      role="alert"
      aria-live="assertive"
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${config.iconColor} mt-0.5`} />
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-70 transition-opacity focus:outline-none"
        aria-label="Fechar notificação"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="
        fixed bottom-6 right-6 z-70
        flex flex-col gap-3
        pointer-events-none
      "
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onClose={() => removeToast(toast.id)} />
        </div>
      ))}
    </div>
  );
}
