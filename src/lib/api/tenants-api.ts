/**
 * SAFISAUDE - Tenants API
 * FASE 7.3 - Multi-Tenant Client Management
 *
 * Functions for tenant CRUD operations (create, read, update, delete)
 * Only accessible by SUPER_ADMIN
 */

import { apiClient, getApiErrorMessage } from '@/lib/api-client';
import { Tenant, CreateTenantRequest, UpdateTenantRequest, CreateTenantResponse } from '@/types/tenant';

/**
 * Fetch all tenants
 * Only SUPER_ADMIN can access this
 *
 * @returns Array of tenants
 * @throws Error if not authorized or request fails
 */
export async function fetchTenants(): Promise<Tenant[]> {
  try {
    const response = await apiClient.get<Tenant[]>('/tenants');
    return response.data || [];
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

/**
 * Fetch a single tenant by ID
 * SUPER_ADMIN can access any tenant
 * SECRETARIO can access only their own tenant
 *
 * @param id - Tenant ID
 * @returns Tenant data
 * @throws Error if not found or not authorized
 */
export async function fetchTenant(id: string): Promise<Tenant> {
  try {
    const response = await apiClient.get<Tenant>(`/tenants/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

/**
 * Create a new tenant with its first secretario
 * Only SUPER_ADMIN can create tenants
 *
 * @param data - Tenant and secretario creation data
 * @returns Created tenant and secretario data
 * @throws Error if validation fails or not authorized
 */
export async function createTenant(
  data: CreateTenantRequest,
): Promise<CreateTenantResponse> {
  try {
    const response = await apiClient.post<CreateTenantResponse>('/tenants', data);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

/**
 * Update tenant information
 * Only SUPER_ADMIN can update tenants
 *
 * @param id - Tenant ID
 * @param data - Partial tenant data to update
 * @returns Updated tenant data
 * @throws Error if not found or not authorized
 */
export async function updateTenant(
  id: string,
  data: UpdateTenantRequest,
): Promise<Tenant> {
  try {
    const response = await apiClient.put<Tenant>(`/tenants/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

/**
 * Delete a tenant
 * Only SUPER_ADMIN can delete tenants
 * ⚠️  This will cascade delete all users in the tenant
 *
 * @param id - Tenant ID
 * @throws Error if not found or not authorized
 */
export async function deleteTenant(id: string): Promise<void> {
  try {
    await apiClient.delete(`/tenants/${id}`);
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

/**
 * Validate CNPJ format
 * @param cnpj - CNPJ string
 * @returns True if valid format, false otherwise
 */
export function isValidCNPJ(cnpj: string): boolean {
  const pattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return pattern.test(cnpj);
}

/**
 * Format CNPJ to standard format (00.000.000/0000-00)
 * @param cnpj - Raw CNPJ string (only digits)
 * @returns Formatted CNPJ
 */
export function formatCNPJ(cnpj: string): string {
  const cleaned = cnpj.replace(/\D/g, '');
  if (cleaned.length !== 14) return cnpj;
  return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12)}`;
}
