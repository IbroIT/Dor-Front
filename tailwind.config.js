/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        scroll: 'scroll 10s linear infinite',
      },
      fontFamily: {
        poppins: ["'Poppins'", "sans-serif"], // Добавлен шрифт Poppins
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors: {
        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
          400: "#03A9F4", // Добавлен для карточек
        },
        violet: {
          300: "#5724ff",
        },
        yellow: {
          100: "#8e983f",
          300: "#edff66",
          400: "#ffc400", // Добавлен для кнопок карточек
        },
        pink: {
          400: "#FF3E7F", // Добавлен для карточек
        },
        teal: {
          400: "#009688", // Добавлен для карточек
        },
      },
      boxShadow: {
        card: '0 35px 80px rgba(0, 0, 0, 0.15)',
        'card-active': '0 0 20px rgba(255, 196, 0, 0.5)',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
        position: 'top, bottom, left, right',
      },
    },
  },
  plugins: [],
};