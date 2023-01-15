/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors:{
        'gray-200':'#F8F8F8',
        'gray-300':'#CECECE',
        'gray-400':'#E2E2E2',
        'gray-500':'#737380',
        'gray-900':'#29292E',
        'purple-300':'#A75ABD',
        'purple-500':'#CB6CE6',
        'red-300':'#E73F5D',
        'red-500':'#D73754',
        'pink-500':'#E559F9'
      },
      fontFamily:{
        poppins:'Poppins'
      }
    },
  },
  plugins: [],
}
