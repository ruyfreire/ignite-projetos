export function capitalizeString(str: string) {
  if (typeof str !== "string") return str

  return str.charAt(0).toUpperCase().concat(str.slice(1))
}
