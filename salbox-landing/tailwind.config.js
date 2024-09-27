/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        scarlet: {
          100: "#FFDAD5",
          200: "#FFB5AB",
          300: "#FF8E80",
          400: "#FD6754",
          500: "#FA3D22",
        },
        moonstone: {
          100: "#D8EFF4",
          200: "#B0DEE9",
          300: "#86CEDD",
          400: "#58BED2",
          500: "#14AEC6",
        },
        white_smoke: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
