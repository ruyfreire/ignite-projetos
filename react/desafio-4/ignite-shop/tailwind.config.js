/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        grayscale: {
          white: '#FFFFFF',
          title: '#E1E1E6',
          text: '#C4C4CC',
          icon: '#8D8D99',
          elements: '#202024',
          background: '#121214',
        },
        brand: {
          light: '#00B37E',
          principal: '#00875F',
        },
      },
      fontSize: {
        none: 0,
        '4xl': '2rem',
      },
      fontFamily: {
        base: 'Roboto, sans-serif',
      },
      maxWidth: {
        'full-right': 'calc(100vw - ((100vw - 1180px) / 2))',
      },
      backgroundImage: {
        'gradient-product': 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
        'gradient-arrow-left':
          'linear-gradient(-90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
        'gradient-arrow-right':
          'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
      },
      keyframes: {
        'slide-left': {
          from: { transform: 'translateX(110%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-left-reverse': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(110%)' },
        },
      },
      animation: {
        'slide-left': 'slide-left 0.5s ease-in-out',
        'slide-left-reverse': 'slide-left-reverse 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
