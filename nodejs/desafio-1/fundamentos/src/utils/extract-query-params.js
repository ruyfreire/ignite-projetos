export function extractQueryParams(query = '') {
  const queries = query
    .slice(1)
    .split('&')
    .reduce((queryParams, param) => {
      const [key, value] = param.split('=')

      queryParams[key] = value

      return queryParams
    }, {})

  return queries
}
