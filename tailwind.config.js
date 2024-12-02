/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        'color-60': '#e5e5e5', 
        'color-30': '#14213d',
        'color-10-a': '#fca311',
        'color-10-b': '#ffffff',
        'color-10-c': '#000000',
      },
      screens: {
        'max-1000': {'max': '1000px'},
        'max-900': {'max': '900px'},
        'max-800': {'max': '800px'},
        'max-750': {'max': '750px'},
        'max-700': {'max': '700px'},
        'max-675': {'max': '675px'},
        'max-600': {'max': '600px'},
        'max-575': {'max': '575px'},
        'max-500': {'max': '500px'},
        'max-450': {'max': '450px'},
        'max-400': {'max': '400px'},
        'max-375': {'max': '375px'},
        'max-350': {'max': '350px'},
      }
    },
  },
  plugins: [],
}

