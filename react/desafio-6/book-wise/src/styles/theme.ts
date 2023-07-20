import { type ThemeConfig } from "tailwindcss/types/config"

export const themeDefault: Partial<ThemeConfig> & {
  extend?: Partial<ThemeConfig>
} = {
  extend: {
    colors: {
      "green-300": "#0A313C",
      "green-200": "#255D6A",
      "green-100": "#50B2C0",
      "purple-200": "#2A2879",
      "purple-100": "#8381D9",
      "gray-800": "#0E1116",
      "gray-700": "#181C2A",
      "gray-600": "#252D4A",
      "gray-500": "#303F73",
      "gray-400": "#8D95AF",
      "gray-300": "#D1D6E4",
      "gray-200": "#E6E8F2",
      "gray-100": "#F8F9FC",
      "danger-400": "#F75A68",
    },
    fontFamily: {
      base: ["Nunito", "sans-serif"],
    },
    fontSize: {
      0: "0",
    },
    backgroundImage: {
      "gradient-light-horizontal":
        "linear-gradient(90deg, #7FD1CC 0%, #9694F5 100%)",
      "gradient-light-vertical":
        "linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)",
      "gradient-dark-horizontal":
        "linear-gradient(90deg, #0E111680 0%, #0E111680 100%), linear-gradient(90deg, #255D6A 0%, #2A2879 10%, #181C2A 30%, #181C2A 80%, #255D6A 100%)",
      "gradient-dark-vertical":
        "linear-gradient(180deg, #0E111680 0%, #0E111680 100%), linear-gradient(180deg, #255D6A 0%, #2A2879 10%, #181C2A 30%, #181C2A 80%, #255D6A 100%)",
    },
    boxShadow: {
      "card-small": "0 0 0 2px theme(colors.gray-600)",
    },
  },
}
