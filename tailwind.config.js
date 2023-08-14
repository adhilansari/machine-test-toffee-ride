/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Poppins: ['Poppins', 'sans-serif'],
        Bungee: ['Bungee', 'cursive']

      }

    },
  },
  plugins: [],
}

