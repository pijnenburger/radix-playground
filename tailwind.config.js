/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Basis Grotesque Pro"],
        serif: ["FreightBig Pro"],
        mono: ["Basis Grotesque Mono Pro"],
      },
    },
  },
  plugins: [],
};
