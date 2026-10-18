/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          primary: '#0A2540',
          charcoal: '#1D1D1F',
          secondary: '#425466',
          muted: '#627D98',
          subtle: '#8F9CA8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8FAFC',
          card: '#FFFFFF',
          muted: '#F1F5F9',
          border: '#E6EBF1',
        },
        brand: {
          blue: '#0A2540',
          accent: '#2563EB',
          emerald: '#059669',
          amber: '#D97706',
        }
      },
      fontFamily: {
        sans: [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'SFMono-Regular',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'chromatic': '0 13px 27px -5px rgba(50, 50, 93, 0.10), 0 8px 16px -8px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(50, 50, 93, 0.04)',
        'chromatic-sm': '0 4px 6px -1px rgba(50, 50, 93, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 1px 1px rgba(50, 50, 93, 0.04)',
        'chromatic-lg': '0 20px 40px -15px rgba(50, 50, 93, 0.15), 0 12px 24px -10px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(50, 50, 93, 0.06)',
      },
      letterSpacing: {
        'tighter-heading': '-0.025em',
      },
      transitionDuration: {
        'micro': '140ms',
      }
    },
  },
  plugins: [],
}
