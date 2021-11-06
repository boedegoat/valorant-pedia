export async function getWeapons() {
  const fetchWeapons = await fetch('https://valorant-api.com/v1/weapons')
  const weapons = await fetchWeapons.json()
  return weapons.data.sort(({ displayName: a }, { displayName: b }) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
}

export async function getWeaponByName(weaponName) {
  const weapons = await getWeapons()
  const weapon = weapons.find(({ displayName }) => {
    return displayName.toLowerCase() === weaponName.toLowerCase()
  })
  return weapon
}

export function getCategories(weapons) {
  const categories = [...new Set(weapons.map((weapon) => weapon.shopData?.category))]
  categories.splice(
    categories.findIndex((c) => typeof c === 'undefined'),
    1,
    'Melee'
  )
  return categories
}

export async function getWeaponSkinsByName(weaponName) {
  const weapon = await getWeaponByName(weaponName)
  return weapon.skins.filter((skin) => !skin.displayName.includes('Standard'))
}
