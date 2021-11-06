export async function getWeapons() {
  const fetchWeapons = await fetch('https://valorant-api.com/v1/weapons')
  const weapons = await fetchWeapons.json()
  return weapons.data
}

export async function getWeaponByName(weaponName) {
  const weapons = await getWeapons()
  const weapon = weapons.find(({ displayName }) => {
    return displayName.toLowerCase() === weaponName.toLowerCase()
  })
  return weapon
}
