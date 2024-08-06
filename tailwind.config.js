/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "15px",
      },
    },
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
      },
      colors: {
        "dark-blue": "var(--dark-blue)",
        "light-green": "var(--light-green)",
        "lighter-green": "var(--lighter-green)",
        "powder-blue": "var(--powder-blue)",
        mint: "var(--mint)",
        sage: "var(--sage)",
        ocean: "var(--ocean)",
        fern: "var(--fern)",
        white: "var(--white)",
        "soft-white": "var(--soft-white)",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
}

