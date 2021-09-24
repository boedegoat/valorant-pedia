export function camelCaseToTitleCase(str) {
  return str[0].toUpperCase() + str.replace(/([A-Z])/g, ' $1').slice(1)
}

export function toTitleCase(str) {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}
