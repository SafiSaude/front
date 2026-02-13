'use client';

/**
 * SAFISAUDE - Delete User Modal Component
 * FASE 5.3 - Delete User Confirmation
 *
 * Modal for confirming user deletion
 */

import { UserResponse } from '@/lib/api/users-api';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

interface DeleteUserModalProps {
  isOpen: boolean;
  user: UserResponse | null;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DeleteUserModal({ isOpen, user, onConfirm, onCancel, isLoading = false }: DeleteUserModalProps) {
  if (!user) return null;

  const isSuperAdmin = user.role === 'SUPER_ADMIN';

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Confirmar Exclusão" size="sm">
      <div className="space-y-4">
        {/* Alert Icon */}
        <div className="flex justify-center">
          <div className="bg-error-100 rounded-full p-4">
            <AlertTriangle className="h-6 w-6 text-error-600" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-900 font-medium">
            Tem certeza que deseja deletar este usuário?
          </p>
          <p className="text-sm text-gray-600">
            {isSuperAdmin
              ? 'Super Admins não podem ser deletados.'
              : `Usuário: ${user.nome} (${user.email})`}
          </p>
        </div>

        {/* Super Admin Warning */}
        {isSuperAdmin && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-3">
            <p className="text-xs text-error-800">
              Super Admins não podem ser deletados do sistema. Apenas outros perfis podem ser removidos.
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="secondary"
            size="md"
            type="button"
            disabled={isLoading || isSuperAdmin}
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            size="md"
            type="button"
            disabled={isLoading || isSuperAdmin}
            isLoading={isLoading}
            onClick={onConfirm}
            className="flex-1"
          >
            {isSuperAdmin ? 'Não pode deletar' : 'Deletar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
