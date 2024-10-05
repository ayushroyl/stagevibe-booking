/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure Tailwind scans all files inside src for classes
  ],
  theme: {
    extend: {
      // You can extend the theme here, add custom colors, fonts, animations, etc.
      colors: {
        partyPurple: '#6B46C1',
        partyPink: '#F56565',
        partyBlue: '#4299E1',
        partyGreen: '#48BB78',
      },
      animation: {
        'pop-in': 'popIn 0.3s ease-out forwards',
      },
      keyframes: {
        popIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
