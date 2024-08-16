/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '15px',
      },
    },
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        newsreader: ['var(--font-newsreader)', 'serif'],
      },
      colors: {
        'dark-blue': 'var(--dark-blue)',
        'light-green-10': 'var(--light-green-10)',
        'light-green': 'var(--light-green)',
        'lighter-green': 'var(--lighter-green)',
        'powder-blue': 'var(--powder-blue)',
        'dark-powder-blue': 'var(--dark-powder-blue)',
        mint: 'var(--mint)',
        sage: 'var(--sage)',
        ocean: 'var(--ocean)',
        fern: 'var(--fern)',
        white: 'var(--white)',
        'soft-white': 'var(--soft-white)',
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1536px',
      },
      boxShadow: {
        '3xl': '0px 4px 34px 0px #00000026',
      }
    },
  },
  plugins: [],
};
