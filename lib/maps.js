export async function getMaps() {
  const fetchMaps = await fetch('https://valorant-api.com/v1/maps')
  return (await fetchMaps.json()).data
    .filter(({ displayName }) => displayName !== 'The Range')
    .sort(({ displayName: a }, { displayName: b }) => {
      if (a > b) return 1
      if (a < b) return -1
      return 0
    })
}

export function getSearchResults(currentMaps, search) {
  return currentMaps
    .filter(({ displayName }) => displayName.toLowerCase().includes(search.toLowerCase()))
    .sort(({ displayName: name1 }, { displayName: name2 }) => {
      if (name1.toLowerCase().startsWith(search)) return -1
      if (name2.toLowerCase().startsWith(search)) return 1
      return 0
    })
}
