/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0E',
        surface: '#121118',
        'surface-border': '#262335',
        crimson: {
          500: '#E60033',
          600: '#C00A27',
          700: '#8B0000',
          glow: '#FF1744',
          bright: '#FF2A55',
        },
        emerald: {
          glow: '#00E676',
          dark: '#0A5C36',
        },
        katana: {
          steel: '#E2E8F0',
          dark: '#1E293B',
        }
      },
      fontFamily: {
        display: ['Cinzel', 'Cinzel Decorative', 'serif'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['Orbitron', 'monospace'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'conic-gradient': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'japanese-pattern': "radial-gradient(#E60033 0.75px, transparent 0.75px), radial-gradient(#E60033 0.75px, #0B0B0E 0.75px)",
      },
      animation: {
        'katana-slash': 'katanaSlash 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
        'ember-rise': 'emberRise 4s infinite linear',
        'glitch': 'glitch 0.4s ease-in-out infinite',
      },
      keyframes: {
        katanaSlash: {
          '0%': { transform: 'scaleX(0) rotate(-5deg)', opacity: '0' },
          '50%': { transform: 'scaleX(1) rotate(-5deg)', opacity: '1' },
          '100%': { transform: 'scaleX(1) rotate(-5deg)', opacity: '0.8' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(230, 0, 51, 0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(255, 42, 85, 0.9))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        emberRise: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
