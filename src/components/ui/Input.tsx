'use client';

/**
 * SAFISAUDE - Input Component
 * FASE 5.1 - Reusable Input Field
 *
 * Text input with label, error handling, and helper text
 */

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, containerClassName = '', className = '', ...props }, ref) => {
    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          className={`
            w-full px-3 py-2
            bg-white border rounded-lg
            text-sm font-normal
            text-gray-900
            placeholder:text-gray-500
            transition-all
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${
              error
                ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
                : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
            }
            ${className}
          `}
          {...props}
        />

        {error && <p className="mt-1 text-sm font-medium text-error-600">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
