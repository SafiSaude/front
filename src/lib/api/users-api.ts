/**
 * SAFISAUDE - Users API
 * FASE 5.2 - User Management API
 *
 * Functions for user CRUD operations (create, read, update, delete)
 */

import { apiClient, getApiErrorMessage } from '@/lib/api-client';
import { UserRole, User } from '@/types/auth';

/**
 * User response from API
 */
export interface UserResponse extends User {
  ativo: boolean;
}

/**
 * Create user request data
 */
export interface CreateUserRequest {
  email: string;
  nome: string;
  role: Exclude<UserRole, 'SUPER_ADMIN'>;
  password: string;
}

/**
 * Update user request data
 */
export interface UpdateUserRequest {
  nome?: string;
  role?: Exclude<UserRole, 'SUPER_ADMIN'>;
  ativo?: boolean;
}

/**
 * Fetch all users (with optional filters)
 *
 * @param role - Filter by role (optional)
 * @param search - Search by name or email (optional)
 * @returns Promise with list of users
 * @throws Error if request fails
 */
export const fetchUsers = async (role?: UserRole, search?: string): Promise<UserResponse[]> => {
  try {
    const params = new URLSearchParams();
    if (role && role !== 'SUPER_ADMIN') {
      params.append('role', role);
    }
    if (search) {
      params.append('search', search);
    }

    const queryString = params.toString();
    const url = queryString ? `/users?${queryString}` : '/users';

    console.log('🌐 API Request:', { url, role, hasFilter: !!queryString });

    const response = await apiClient.get<UserResponse[]>(url);
    console.log('🎯 API Response:', { url, count: response.data.length, roles: [...new Set(response.data.map(u => u.role))] });
    return response.data;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message);
  }
};

/**
 * Fetch a single user by ID
 *
 * @param userId - User ID
 * @returns Promise with user data
 * @throws Error if user not found or request fails
 */
export const fetchUserById = async (userId: string): Promise<UserResponse> => {
  try {
    const response = await apiClient.get<UserResponse>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message);
  }
};

/**
 * Create a new user
 *
 * @param data - User data to create
 * @returns Promise with created user
 * @throws Error if creation fails
 */
export const createUser = async (data: CreateUserRequest): Promise<UserResponse> => {
  try {
    const response = await apiClient.post<UserResponse>('/users', data);
    return response.data;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message);
  }
};

/**
 * Update an existing user
 *
 * @param userId - User ID to update
 * @param data - User data to update
 * @returns Promise with updated user
 * @throws Error if update fails
 */
export const updateUser = async (userId: string, data: UpdateUserRequest): Promise<UserResponse> => {
  try {
    const response = await apiClient.patch<UserResponse>(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message);
  }
};

/**
 * Delete a user by ID
 *
 * @param userId - User ID to delete
 * @returns Promise<void>
 * @throws Error if deletion fails
 */
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await apiClient.delete(`/users/${userId}`);
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message);
  }
};

/**
 * Check if user can be deleted (not Super Admin)
 *
 * @param user - User to check
 * @returns boolean - true if user can be deleted
 */
export const canDeleteUser = (user: UserResponse): boolean => {
  return user.role !== 'SUPER_ADMIN';
};

/**
 * Check if user can be edited
 *
 * @param user - User to check
 * @returns boolean - true if user can be edited (always true for all users)
 */
export const canEditUser = (user: UserResponse): boolean => {
  return true;
};
