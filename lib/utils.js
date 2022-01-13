export function camelCaseToTitleCase(str) {
  return str[0].toUpperCase() + str.replace(/([A-Z])/g, ' $1').slice(1)
}

export function toTitleCase(str) {
  if (!str) return null
  return str.replace(/(^\w| \w)/g, m => m.toUpperCase())
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
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getDocument(ref, docId) {
  const snapshot = await ref.doc(docId).get()
  return snapshot
}

export async function getDocumentDataWithId(ref, docId) {
  const snapshot = await ref.doc(docId).get()
  return {
    id: snapshot.id,
    ...snapshot.data(),
  }
}

export async function getCollection(ref) {
  const snapshot = await ref.get()
  return snapshot
}

export async function getCollectionDataWithId(ref) {
  const snapshot = await ref.get()
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export function search(searchInput, { data, field }) {
  const results = data.filter(item => {
    const searchWords = searchInput.split(' ')
    return searchWords.every(word => item[field].toLowerCase().includes(word.toLowerCase()))
  })
  return results
}
