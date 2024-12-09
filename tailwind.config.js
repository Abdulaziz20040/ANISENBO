export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true, // Kontainerni markazlashtiradi
        padding: {
          DEFAULT: "1rem", // Har bir tomondan asosiy padding
          sm: "2rem", // Kichik ekranlar uchun padding
          lg: "2rem", // Katta ekranlar uchun padding
          xl: "5rem", // Juda katta ekranlar uchun paddingp
        },
        screens: {
          sm: "100%", // Telefonlar uchun to'liq kenglik
          md: "100%", // Planshetlar uchun to'liq kenglik
          lg: "1250px", // Katta noutbuklar uchun kenglik
          xl: "1280px", // Juda katta ekranlar uchun kenglik
          "2xl": "1536px", // Juda keng ekranlar uchun kenglik
        },
      },
    },
  },
  plugins: [],
};
