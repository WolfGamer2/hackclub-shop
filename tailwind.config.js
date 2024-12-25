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
        'hackclub-red': '#EC3750',
        'hackclub-text': '#181F25',
        'hackclub-dark': '#1a1d1f',
        'hackclub-light': '#f1f1f1',
        'hackclub-blue': '#0061f2',
      },
      fontFamily: {
        'phantom-sans': ['Phantom Sans', 'sans-serif'],
      },
      gradientColorStops: theme => ({
        'hot-start': '#FF8C37',
        'hot-end': '#EC3750',
        'apparel-start': '#F1C40F',
        'apparel-end': '#33D6A6',
        'accessories-start': '#5BC0DE',
        'accessories-end': '#A633D6',
      }),
    },
  },
  plugins: [],
};
