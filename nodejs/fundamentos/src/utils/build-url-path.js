export function buildUrlPath(path) {
  const regexParams = /:([a-zA-Z]+)/g

  const regexRoute = path.replaceAll(regexParams, '(?<$1>[a-z0-9-_]+)')

  const regex = new RegExp(`^${regexRoute}(?<query>\\?(.*))?$`)

  return regex
}
