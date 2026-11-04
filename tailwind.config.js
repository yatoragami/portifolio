/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070a0d",
        paper: "#d7e4dc",
        acid: "#b8ff3b",
        signal: "#42f5c5",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        glow: "0 0 42px rgba(66, 245, 197, .15)",
      },
    },
  },
  plugins: [],
};
