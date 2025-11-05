/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vexto: {
          'blue-violet': '#6c07f3',
          'dark-turquoise': '#12c2e3',
          'deep-pink': '#f13083',
          'dark-slate-blue': '#4a2472',
          'white-smoke': '#f3f2f4',
          primary: '#6c07f3',
          secondary: '#12c2e3',
          accent: '#f13083',
          dark: '#4a2472',
          light: '#f3f2f4',
          charcoal: '#1F2937',
          'charcoal-dark': '#111827',
          slate: '#64748B',
          'slate-light': '#94A3B8',
          white: '#FFFFFF',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.2', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'button': ['16px', { lineHeight: '1', fontWeight: '500' }],
      },
      spacing: {
        'base': '24px',
      },
      borderRadius: {
        'button': '8px',
        'card': '12px',
      },
      maxWidth: {
        'container': '1200px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(108, 7, 243, 0.15)',
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(108, 7, 243, 0.2)',
        'glow-turquoise': '0 0 20px rgba(18, 194, 227, 0.3)',
        'glow-pink': '0 0 20px rgba(241, 48, 131, 0.3)',
      },
      transitionDuration: {
        'smooth': '200ms',
        'slower': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-underline': 'slideUnderline 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'menu-stagger': 'menuStagger 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUnderline: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        menuStagger: {
          '0%': { transform: 'translateX(-8px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [],
};
