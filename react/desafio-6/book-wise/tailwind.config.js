import { extendCSS3Plugin } from "./src/styles/plugins/css3"
import { textEllipsisPlugin } from "./src/styles/plugins/text-elipses"
import { themeDefault } from "./src/styles/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: themeDefault,
  plugins: [textEllipsisPlugin(), extendCSS3Plugin()],
}
