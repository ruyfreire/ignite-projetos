import plugin from "tailwindcss/plugin"

export const extendCSS3Plugin = () => {
  return plugin(function ({ addVariant, matchVariant }) {
    matchVariant("has-id", (id) => {
      return `&:has(#${id})`
    })

    matchVariant("has-class", (id) => {
      return `&:has(.${id})`
    })

    matchVariant("has-element", (id) => {
      return `&:has(${id})`
    })
  })
}
