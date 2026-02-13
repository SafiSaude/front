'use client';

/**
 * SAFISAUDE - Users Table Component
 * FASE 5.3 - User Management Table
 *
 * Displays list of users with actions (edit, delete)
 */

import { UserResponse } from '@/lib/api/users-api';
import RoleBadge from '@/components/ui/RoleBadge';
import Button from '@/components/ui/Button';
import { Edit, Trash2, Loader } from 'lucide-react';

interface UsersTableProps {
  users: UserResponse[];
  isLoading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (user: UserResponse) => void;
}

export function UsersTable({ users, isLoading = false, onEdit, onDelete }: UsersTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-sm">Nenhum usuário encontrado</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-soft border border-gray-200">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nome</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Perfil</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              {/* ID */}
              <td className="px-4 py-3 text-sm">
                <code className="text-gray-600 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                  {user.id.substring(0, 8)}...
                </code>
              </td>

              {/* Nome */}
              <td className="px-4 py-3">
                <div className="text-sm font-medium text-gray-900">{user.nome}</div>
              </td>

              {/* Email */}
              <td className="px-4 py-3">
                <div className="text-sm text-gray-600">{user.email}</div>
              </td>

              {/* Perfil */}
              <td className="px-4 py-3">
                <RoleBadge role={user.role} />
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.ativo
                      ? 'bg-success-100 text-success-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {user.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </td>

              {/* Ações */}
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  {/* Edit Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(user.id)}
                    title="Editar usuário"
                    className="p-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  {/* Delete Button (disabled for Super Admin) */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(user)}
                    disabled={user.role === 'SUPER_ADMIN'}
                    title={
                      user.role === 'SUPER_ADMIN'
                        ? 'Super Admins não podem ser deletados'
                        : 'Deletar usuário'
                    }
                    className={`p-2 ${user.role === 'SUPER_ADMIN' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Trash2 className="h-4 w-4 text-error-600" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
