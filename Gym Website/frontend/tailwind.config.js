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
        primary: {
          light: '#F8FAFC',
          DEFAULT: '#111827', // Slate 900
          dark: '#0F172A', // Slate 950
        },
        secondary: '#1F2937', // Slate 800
        accent: {
          light: '#60A5FA',
          DEFAULT: '#3B82F6', // Blue 500
          dark: '#2563EB',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        card: {
          light: '#FFFFFF',
          dark: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(0,0,0,0.05)',
        'premium-dark': '0 20px 40px -15px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'mesh-light': 'radial-gradient(at 0% 0%, hsla(217,100%,70%,0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(210,100%,70%,0.1) 0px, transparent 50%)',
        'mesh-dark': 'radial-gradient(at 0% 0%, hsla(217,100%,70%,0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(210,100%,70%,0.05) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
