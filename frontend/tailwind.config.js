/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primeBlue: '#0582FF', 
        primeBlueDark: '#045ac3', 
      },
      boxShadow: {
        'custom': '0 10px 20px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.05), 0 -2px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}

