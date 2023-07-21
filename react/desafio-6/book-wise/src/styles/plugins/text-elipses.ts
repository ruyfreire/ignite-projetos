import plugin from "tailwindcss/plugin"

export const textEllipsisPlugin = () => {
  return plugin(function ({ addUtilities, matchUtilities }) {
    addUtilities({
      ".text-ellipsis-block": {
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
      },
    })

    matchUtilities(
      {
        "ellipsis-block-lines": (value) => {
          return { "-webkit-line-clamp": value }
        },
      },
      {
        values: {
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
        },
      },
    )
  })
}
