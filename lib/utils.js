export function camelCaseToTitleCase(str) {
  return str[0].toUpperCase() + str.replace(/([A-Z])/g, ' $1').slice(1)
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}
