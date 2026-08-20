/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        moody: {
          950: '#080c0a', // deep obsidian root
          900: '#0e1513', // deepest background
          850: '#131e1a', // card & panel background
          800: '#1a2924', // elevated card / container
          750: '#233730', // borders / subtle dividers
          700: '#2e473e', // hover highlights
          600: '#3f5e53', // muted emerald
          500: '#537b6e', // forest sage
          400: '#759f91', // soft sage text / accent
          300: '#a2c2b6', // bright sage
          200: '#cce1da', // pale sage
          100: '#eef5f2', // linen white
        },
        gold: {
          50: '#fcf8ee',
          100: '#f7edd2',
          200: '#eedba6',
          300: '#e3c374',
          400: '#d7ab4b',
          500: '#c5932d', // rich antique gold
          600: '#aa7622',
          700: '#88561d',
          800: '#71461e',
          900: '#603b1e',
        },
        terracotta: {
          400: '#d4836f',
          500: '#c16752', // warm moody clay
          600: '#a74f3c',
        },
        slateMood: {
          900: '#111618',
          800: '#1b2226',
          700: '#283339',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cinzel)', 'serif'],
      },
      boxShadow: {
        'moody-glow': '0 0 50px -10px rgba(197, 147, 45, 0.15)',
        'emerald-glow': '0 0 50px -10px rgba(63, 94, 83, 0.25)',
        'card-elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'moody-gradient': 'radial-gradient(ellipse at top, #1a2924 0%, #0e1513 70%, #080c0a 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #e3c374 0%, #c5932d 50%, #88561d 100%)',
        'emerald-shimmer': 'linear-gradient(135deg, #537b6e 0%, #2e473e 50%, #1a2924 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
