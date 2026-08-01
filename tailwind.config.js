/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1C1A17',
        surface: '#24211D',
        'surface-elevated': '#2E2924',
        bone: '#F5F1EA',
        bronze: {
          DEFAULT: '#B5652E',
          hover: '#D87838',
          glow: 'rgba(181, 101, 46, 0.25)',
        },
        blueprint: {
          DEFAULT: '#38BDF8',
          glow: 'rgba(56, 189, 248, 0.3)',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
