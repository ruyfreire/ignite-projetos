import { type ThemeConfig } from "tailwindcss/types/config"

export const themeDefault: Partial<ThemeConfig> & {
  extend?: Partial<ThemeConfig>
} = {
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
  },
  fontFamily: {
    base: ["Nunito", "sans-serif"],
  },
}
