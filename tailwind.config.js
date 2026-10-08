/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        gold: {
          50: '#FAF6EB',
          100: '#F4ECCF',
          200: '#EAD79D',
          300: '#DFC16B',
          400: '#D4AF37', // signature metallic gold
          500: '#C5A028',
          600: '#A1821C',
          700: '#7C6415',
          800: '#58460D',
          900: '#342906',
        },
        dark: {
          950: '#060709',
          900: '#0C0D11',
          850: '#111318',
          800: '#171920',
          750: '#1E212A',
          700: '#262935',
          600: '#383D4D',
          500: '#4D5366',
        }
      },
      fontFamily: {
        display: ['Syne', 'Oswald', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5E5B8 0%, #D4AF37 50%, #A68222 100%)',
        'metallic-silver': 'linear-gradient(135deg, #FFFFFF 0%, #D1D5DB 50%, #9CA3AF 100%)',
        'dark-card': 'linear-gradient(180deg, rgba(23, 25, 32, 0.85) 0%, rgba(12, 13, 17, 0.95) 100%)',
        'hero-gradient': 'radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.08) 0%, rgba(6, 7, 9, 0) 70%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(212, 175, 55, 0.15)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 10px 40px -10px rgba(212, 175, 55, 0.35)',
        'dark-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
