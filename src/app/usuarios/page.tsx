'use client';

/**
 * SAFISAUDE - Users List Page
 * FASE 5.4 - User Management - List
 *
 * Main page for listing and managing users
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchUsers, deleteUser, UserResponse } from '@/lib/api/users-api';
import { getApiErrorMessage } from '@/lib/api-client';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select, { SelectOption } from '@/components/ui/Select';
import { UsersTable } from '@/components/usuarios/UsersTable';
import { DeleteUserModal } from '@/components/usuarios/DeleteUserModal';
import { Plus, AlertCircle } from 'lucide-react';

const roleOptions: SelectOption[] = [
  { value: '', label: 'Todos os perfis' },
  { value: 'SUPORTE_ADMIN', label: 'Suporte Admin' },
  { value: 'FINANCEIRO_ADMIN', label: 'Financeiro Admin' },
  { value: 'SECRETARIO', label: 'Secretário' },
  { value: 'FINANCEIRO', label: 'Financeiro' },
  { value: 'VISUALIZADOR', label: 'Visualizador' },
];

export default function UsersPage() {
  const router = useRouter();
  const { user: currentUser, loading: authLoading } = useAuth();
  const { showSuccess, showError } = useToast();

  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Mark component as mounted (hydration fix)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check authorization after auth is loaded
  useEffect(() => {
    if (mounted && !authLoading) {
      if (currentUser?.role === 'SUPER_ADMIN') {
        setIsAuthorized(true);
        loadUsers();
      } else {
        showError('Acesso restrito. Apenas Super Admin pode gerenciar usuários.');
        setTimeout(() => router.push('/dashboard'), 1000);
      }
    }
  }, [currentUser, router, showError, mounted, authLoading]);

  // Reload users when role filter changes
  useEffect(() => {
    if (isAuthorized && roleFilter !== '') {
      loadUsers();
    }
  }, [roleFilter, isAuthorized]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const roleParam = roleFilter && roleFilter !== '' ? (roleFilter as UserRole) : undefined;
      const data = await fetchUsers(roleParam);
      setUsers(data);
    } catch (error) {
      const message = getApiErrorMessage(error);
      showError(message);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter users by search term AND role (client-side fallback)
  const filteredUsers = users.filter((user) => {
    // Filter by search term
    const matchesSearch =
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by role (client-side fallback if backend doesn't filter)
    const matchesRole = !roleFilter || roleFilter === '' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    setIsDeleting(true);
    try {
      await deleteUser(selectedUser.id);
      showSuccess('Usuário deletado com sucesso!');
      setDeleteModalOpen(false);
      setSelectedUser(null);
      // Reload users list
      loadUsers();
    } catch (error) {
      const message = getApiErrorMessage(error);
      showError(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (userId: string) => {
    router.push(`/usuarios/${userId}/editar`);
  };

  const handleDelete = (user: UserResponse) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // Show loading while auth is being initialized and authorization is being checked (hydration fix)
  if (authLoading || !mounted || !isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-950"></div>
          <p className="text-gray-600 text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Usuários</h1>
            <p className="text-gray-600 mt-1">Visualize e gerencie usuários do sistema</p>
          </div>
          <Link href="/usuarios/novo">
            <Button variant="primary" size="lg" className="flex items-center gap-2 whitespace-nowrap">
              <Plus className="h-5 w-5" />
              Novo Usuário
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Buscar por nome ou email..."
          label="Buscar Usuário"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          containerClassName="w-full"
        />
        <Select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
          }}
          options={roleOptions}
          containerClassName="w-full"
          label="Filtrar por Perfil"
        />
      </div>

      {/* Users Table */}
      <UsersTable
        users={filteredUsers}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Delete Modal */}
      <DeleteUserModal
        isOpen={deleteModalOpen}
        user={selectedUser}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        isLoading={isDeleting}
      />
    </div>
  );
}
