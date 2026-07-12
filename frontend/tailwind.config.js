/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic Surfaces (Warm off-whites)
        surface: {
          50: '#F8FAFC',
          100: '#F5F7FB',
          200: '#EEF5FF',
          300: '#E2E8F0',
          400: '#CBD5E1',
          500: '#94A3B8',
          600: '#64748B',
          700: '#475569',
          800: '#1E293B', // Dark Navy Text
          900: '#0F172A', // Display headers
        },
        primary: {
          light: '#F8FAFC',
          DEFAULT: '#F5F7FB',
          dark: '#EEF5FF',
        },
        accent: {
          light: '#60A5FA', // Electric Blue light
          DEFAULT: '#2563EB', // Royal Blue
          dark: '#1D4ED8',
        },
        emerald: {
          DEFAULT: '#10B981',
        },
        orange: {
          DEFAULT: '#F97316',
        },
        purple: {
          DEFAULT: '#8B5CF6',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5'
        },
        warning: {
          DEFAULT: '#F97316',
          light: '#FEF3C7'
        },
        danger: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2'
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 6px -1px rgb(0 0 0 / 0.02), 0 10px 15px -3px rgb(0 0 0 / 0.04)',
        'premium-hover': '0 10px 15px -3px rgb(0 0 0 / 0.04), 0 20px 25px -5px rgb(0 0 0 / 0.08)',
        'glow': '0 0 20px rgba(37, 99, 235, 0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
