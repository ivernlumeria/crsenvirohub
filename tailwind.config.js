/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        permit: {
          red: '#FF6B6B',
          teal: '#4ECDC4',
          blue: '#45B7D1',
          salmon: '#FFA07A',
        },
      },
    },
  },
  plugins: [],
};
