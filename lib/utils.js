export function camelCaseToTitleCase(str) {
  return str[0].toUpperCase() + str.replace(/([A-Z])/g, ' $1').slice(1)
}

export function toTitleCase(str) {
  if (!str) return null
  return str.replace(/(^\w| \w)/g, (m) => m.toUpperCase())
}

export function capitalize(str) {
  if (!str) return null
  return str[0].toUpperCase() + str.slice(1)
}

export function isObjectNotEmpty(object) {
  return object && Object.keys(object).length
}

export function cssAspectRatio(aspectRatio) {
  return `pb-[calc((${aspectRatio.split('/').reverse().join('/')})*100%)]`
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
