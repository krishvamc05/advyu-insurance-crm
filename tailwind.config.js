/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B132B',
          50: '#F0F4F8',
          100: '#D9E2EC',
          800: '#16213E',
          900: '#0B132B',
          950: '#070D1F',
        },
        emerald: {
          DEFAULT: '#10B981',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        amber: {
          DEFAULT: '#F59E0B',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        slatebg: '#F8FAFC',
        subtleborder: '#E2E8F0',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(11, 19, 43, 0.06), 0 1px 3px 0 rgba(11, 19, 43, 0.04)',
        'card-hover': '0 12px 32px -4px rgba(11, 19, 43, 0.12), 0 4px 10px -2px rgba(11, 19, 43, 0.06)',
        'cta-emerald': '0 8px 24px -4px rgba(16, 185, 129, 0.42)',
      },
    },
  },
  plugins: [],
};
