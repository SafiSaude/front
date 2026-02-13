import type { Config } from 'tailwindcss'

/**
 * SAFISAUDE Design System - Tailwind CSS Configuration
 * Version 1.0 - FASE 3
 *
 * Primary Brand Color: #082f49 (sky-950)
 * Target: WCAG 2.1 Level AA Accessibility
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors (Dark Blue)
        primary: {
          50: '#f0f9ff',   // Very light background
          100: '#e0f2fe',  // Subtle background
          200: '#bae6fd',  // Light accent
          300: '#7dd3fc',  // Soft highlight
          400: '#38bdf8',  // Medium accent
          500: '#0ea5e9',  // Standard accent
          600: '#0284c7',  // Hover state
          700: '#0369a1',  // Active state
          800: '#075985',  // Dark accent
          900: '#0c4a6e',  // Deep blue
          950: '#082f49',  // Brand primary - darkest
        },

        // Semantic Colors - Success (Green)
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',  // Base success
          600: '#16a34a',  // Hover
          700: '#15803d',  // Active
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },

        // Semantic Colors - Warning (Orange)
        warning: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',  // Base warning
          600: '#ea580c',  // Hover
          700: '#c2410c',  // Active
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },

        // Semantic Colors - Error (Red)
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',  // Base error
          600: '#dc2626',  // Hover
          700: '#b91c1c',  // Active
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },

        // Semantic Colors - Info (Blue)
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Base info
          600: '#2563eb',  // Hover
          700: '#1d4ed8',  // Active
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },

      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],                           // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],                              // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],                           // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],  // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],     // 24px
        '3xl': ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],     // 32px
      },

      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 24px rgba(0, 0, 0, 0.16)',
        'primary': '0 4px 16px rgba(8, 47, 73, 0.2)',  // Primary color shadow
      },

      borderRadius: {
        'lg': '0.5rem',   // 8px
        'xl': '0.75rem',  // 12px
        '2xl': '1rem',    // 16px
      },

      spacing: {
        '16': '4rem',     // 64px - Sidebar collapsed width
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '70': '17.5rem',  // 280px - Sidebar expanded width
      },

      zIndex: {
        '60': '60',   // Popovers over modals
        '70': '70',   // Toast notifications
        '80': '80',   // Critical alerts
        '90': '90',   // Loading overlays
        '100': '100', // Maximum z-index
      },

      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-out-right': 'slideOutRight 0.3s ease-in',
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-out': 'fadeOut 0.2s ease-in',
        'spin-slow': 'spin 1.5s linear infinite',
      },

      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    // Safe area support for mobile notches
    function ({ addComponents }: { addComponents: (components: Record<string, Record<string, string>>) => void }) {
      addComponents({
        '.pb-safe': { paddingBottom: 'env(safe-area-inset-bottom)' },
        '.pt-safe': { paddingTop: 'env(safe-area-inset-top)' },
        '.pl-safe': { paddingLeft: 'env(safe-area-inset-left)' },
        '.pr-safe': { paddingRight: 'env(safe-area-inset-right)' },
      });
    },
  ],
}

export default config
