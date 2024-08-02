/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#304FFE",
        secondary: "#FDD835",
        error: "#F44336",
        success: "#43A048",
        warning: "#FB8A00",
        content: {
          primary: "#2A2A2A",
          secondary: "#414141",
          tertiary: "#5A5A5A",
          disabled: "#B8B8B8",
          account: "#1E3AE5",
          secondaryColor: "#F57F17",
          success: "#1B5E21",
          error: "#B71B1C",
          warning: "#983301",
          onInverse: "#121212",
          onColor: "#FFFFFF",
        },
        background: {
          light: "#FFFFFF",
          inverse: "#121212",
          accent: "#304FFE",
          secondary: "#FDD835",
          error: "#F44336",
          success: "#43A048",
          warning: "#FB8A00",
          accentLight: "#EAEBFF",
          secondaryLight: "#FFF9C4",
          errorLight: "#FFEBEE",
          successLight: "#E8F5E9",
          warningLight: "#FFF3E0",
        },
        border: {
          border: "#D0D0D0",
          accent: "#576CFF",
          error: "#F44336",
          success: "#66BB6B",
          warning: "#FFA525",
          divider: {
            primary: "#E8E8E8",
            accent: "#C9CCFF",
            error: "#FFCDD2",
            success: "#C8E6C9",
            warning: "#FFF3E0",
          },
        }
      }
    },
  },
  plugins: [],
}

