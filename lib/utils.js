export function camelCaseToTitleCase(str) {
  return str[0].toUpperCase() + str.replace(/([A-Z])/g, ' $1').slice(1)
}

export function toTitleCase(str) {
  if (!str) return null
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function capitalize(str) {
  if (!str) return null
  return str[0].toUpperCase() + str.slice(1)
}

export function isObjectNotEmpty(object) {
  return object && Object.keys(object).length
}

// ☕ source: https://levelup.gitconnected.com/use-regex-and-javascript-to-improve-search-results-870932050d08
export function compareSearch(target, search) {
  target = target.toLowerCase()
  search = search.toLowerCase()
  const isInclude = target.includes(search)

  const subTarget = target.substring(0, 3)
  const subSearch = search.substring(0, 3)
  const pattern = subSearch
    .split('')
    .map((x) => {
      return `(?=.*${x})`
    })
    .join('')
  const patternRegex = new RegExp(pattern, 'g')

  return isInclude || subTarget.match(patternRegex)
}
