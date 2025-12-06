/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
        },
        colors: {
            surf: {
                blue: '#0063b0',
                pink: '#ec008c',
                orange: '#f47920',
            }
        }
      },
    },
    plugins: [],
  }
