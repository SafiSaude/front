/**
 * SAFISAUDE - StatCard Component
 * FASE 3.4 - Dashboard Role-Based
 *
 * Reusable statistic card component with optional trend indicator
 */

import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { direction: 'up' | 'down'; percentage: number };
  icon?: React.ReactNode;
  borderColor?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  borderColor = 'border-l-primary-950',
}: StatCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-soft border border-gray-200 border-l-4 ${borderColor} p-6`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              {trend.direction === 'up' ? (
                <svg
                  className="w-4 h-4 text-success-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-error-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              )}
              <span
                className={`text-sm font-medium ml-1 ${
                  trend.direction === 'up' ? 'text-success-600' : 'text-error-600'
                }`}
              >
                {trend.percentage}%
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
