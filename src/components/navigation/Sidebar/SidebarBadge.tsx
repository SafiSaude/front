/**
 * SAFISAUDE - Sidebar Badge Component
 * FASE 4.4 - Navigation Badge
 *
 * Displays notification badges on navigation items
 * Supports 4 variants: info, warning, danger, success
 */

import type { NavigationBadge, BadgeVariant } from '@/types/navigation';
import { cn } from '@/lib/utils';

interface SidebarBadgeProps {
  /** Badge configuration */
  badge: NavigationBadge;
  /** Size variant */
  size?: 'sm' | 'md';
}

/**
 * Variant color classes mapping
 */
const variantClasses: Record<BadgeVariant, string> = {
  info: 'bg-blue-100 text-blue-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
  success: 'bg-green-100 text-green-700',
};

/**
 * Size classes mapping
 */
const sizeClasses = {
  sm: 'px-1.5 py-0.5 text-xs min-w-[18px]',
  md: 'px-2 py-0.5 text-xs min-w-[22px]',
};

/**
 * SidebarBadge Component
 *
 * Displays a count badge with variant-based styling
 * Automatically truncates counts over 99 to "99+"
 */
export function SidebarBadge({ badge, size = 'md' }: SidebarBadgeProps) {
  // Format display count
  const displayCount = badge.count > 99 ? '99+' : badge.count.toString();

  return (
    <span
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        'rounded-full font-semibold whitespace-nowrap',
        'leading-none',
        // Variant colors
        variantClasses[badge.variant],
        // Size
        sizeClasses[size]
      )}
      aria-label={`${badge.count} ${badge.variant === 'danger' ? 'urgente' : badge.variant === 'warning' ? 'pendente' : 'novo'}`}
    >
      {displayCount}
    </span>
  );
}
