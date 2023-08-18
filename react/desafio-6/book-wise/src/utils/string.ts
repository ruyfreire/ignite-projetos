function isString(str: any) {
  return typeof str === "string"
}

export function capitalizeString(str: string) {
  if (!isString(str)) return str

  return str.charAt(0).toUpperCase().concat(str.slice(1))
}

export function normalizeString(str: string) {
  if (!isString(str)) return str

  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

export function sanitizeString(str: string) {
  if (!isString(str)) return str

  return str.replace(/[^a-zA-Z0-9 -.,]/g, "")
}
