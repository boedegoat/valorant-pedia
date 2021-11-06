import Layout from '../../../components/global/Layout'
import Header from '../../../components/[weaponName]-page/Header'
import { getWeaponByName, getWeapons } from '../../../lib/weapons'

export default function Weapon({ weapon }) {
  console.log(weapon)

  return (
    <Layout title={weapon.displayName} back='/weapons'>
      <Header weapon={weapon} />
      {/* weapon stats */}
      {/* damage range -> */}
      {/* skins -> */}
    </Layout>
  )
}

export async function getStaticPaths() {
  const weapons = await getWeapons()
  const paths = weapons.map((weapon) => ({
    params: { weaponName: weapon.displayName.toLowerCase() },
  }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(context) {
  const { weaponName } = context.params
  const weapon = await getWeaponByName(weaponName)
  const props = { weapon }
  return { props, revalidate: 60 }
}
