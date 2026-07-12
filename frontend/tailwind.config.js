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
          50: '#FCFBFA', // Base background
          100: '#F5F4F1', // Elevated cards
          200: '#E6E4DD', // Borders
          300: '#D4D2C9',
          400: '#A3A095',
          500: '#737064',
          600: '#524F45',
          700: '#3D3A32',
          800: '#292621', // Primary body text
          900: '#141310', // Display headers
        },
        primary: {
          light: '#2E3A4A',
          DEFAULT: '#1B2430', // Deep rich navy/slate
          dark: '#0F151D',
        },
        accent: {
          light: '#3B82F6',
          DEFAULT: '#2563EB', // Brand blue
          dark: '#1D4ED8',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5'
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7'
        },
        danger: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2'
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
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
