/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Jakarta: ["Jakarta", "sans-serif"],
        JakartaBold: ["Jakarta-Bold", "sans-serif"],
        JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
        JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
        JakartaLight: ["Jakarta-Light", "sans-serif"],
        JakartaMedium: ["Jakarta-Medium", "sans-serif"],
        JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
        Noto:["Noto"],
        NotoBold:["Noto-Bold"],
        NotoSemiBold:["Noto-SemiBold"],
        NotoMedium:["Noto-Medium"]
      },
      colors: {
        primary: {
          100: "#F5F5DC", // Soft Beige
          200: "#E8E8E0", // Light Beige
          300: "#D3D3D3", // Light Gray
          400: "#994EF8", // Rich Gold
          500: "#672CBC", // Deep Green
          600: "#4E2999", // Slightly Brighter Deep Green
          700: "#003a00", // Darker Deep Green
          800: "#002600", // Very Dark Deep Green
          900: "#001300", // Almost Black Deep Green
        },
        secondary: {
          100: "#F5F5DC", // Soft Beige
          200: "#D9D9D9", // Light Gray
          300: "#C2C2C2", // Gray
          400: "#999999", // Medium Gray
          500: "#240F4F", // Sky Blue
          600: "#4A65B2", // Darker Sky Blue
          700: "#3A4D8A", // Even Darker Sky Blue
          800: "#2A3460", // Very Dark Sky Blue
          900: "#1A1A40", // Almost Black Sky Blue
        },
        success: {
          100: "#F0FFF4",
          200: "#C6F6D5",
          300: "#9AE6B4",
          400: "#68D391",
          500: "#38A169",
          600: "#2F855A",
          700: "#276749",
          800: "#22543D",
          900: "#1C4532",
        },
        danger: {
          100: "#FFF5F5",
          200: "#FED7D7",
          300: "#FEB2B2",
          400: "#FC8181",
          500: "#F56565",
          600: "#E53E3E",
          700: "#C53030",
          800: "#9B2C2C",
          900: "#742A2A",
        },
        warning: {
          100: "#FFFBEB",
          200: "#FEF3C7",
          300: "#FDE68A",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          800: "#854D0E",
          900: "#713F12",
        },
        general: {
          100: "#CED1DD",
          200: "#858585",
          300: "#EEEEEE",
          400: "#0CC25F",
          500: "#F6F8FA",
          600: "#E6F3FF",
          700: "#EBEBEB",
          800: "#ADADAD",
        },
      },
    },
  },
  plugins: [],
};
