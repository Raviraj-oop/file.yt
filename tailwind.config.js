/** Design tokens for the whole site. Change colours, fonts and shadows here. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f8f9fc', 100: '#f1f3f9', 200: '#e5e8f1', 300: '#cfd4e2', 400: '#949db3',
          500: '#616b84', 600: '#465069', 700: '#2d3653', 800: '#192041', 900: '#0e1329', 950: '#080b1a',
        },
        brand: {
          50: '#eef0ff', 100: '#e0e4ff', 200: '#c7cdff', 300: '#a4acfd', 400: '#8085f9',
          500: '#635ff2', 600: '#4f46e5', 700: '#4036c9', 800: '#352fa2', 900: '#2e2c80',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans Variable"', '"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(14,19,41,.04), 0 4px 16px -4px rgba(14,19,41,.06)',
        lift: '0 2px 4px rgba(14,19,41,.04), 0 18px 40px -12px rgba(14,19,41,.16)',
        brand: 'inset 0 1px 0 rgba(255,255,255,.18), 0 1px 2px rgba(14,19,41,.2), 0 8px 20px -8px rgba(79,70,229,.55)',
      },
      maxWidth: { page: '1200px' },
      keyframes: {
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        flow: { to: { strokeDashoffset: '-40' } },
      },
      animation: { shimmer: 'shimmer 1.5s infinite', flow: 'flow 1.6s linear infinite' },
    },
  },
  plugins: [],
};
