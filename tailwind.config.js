/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'hackclub-dark': '#1a1d1f',
        'hackclub-light': '#f1f1f1',
        'hackclub-red': '#f46d00',
        'hackclub-blue': '#0061f2',
      },
    },
  },
  plugins: [],
};
