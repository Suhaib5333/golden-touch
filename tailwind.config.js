/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#2C2118',
          gold: '#C9A96E',
          'gold-light': '#D4BA8A',
          'gold-dark': '#A8884F',
          cream: '#FAF7F2',
          'cream-dark': '#F0E8D8',
          charcoal: '#1A1A1A',
          light: '#F5F0E8',
        },
      },
      fontFamily: {
        arabic: ['Tajawal', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A96E 0%, #D4BA8A 50%, #A8884F 100%)',
        'dark-gradient': 'linear-gradient(135deg, #2C2118 0%, #1A1A1A 100%)',
      },
    },
  },
  plugins: [],
}
