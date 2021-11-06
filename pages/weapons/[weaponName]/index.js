import Layout from '../../../components/global/Layout'
import Wrapper from '../../../components/global/Wrapper'
import Header from '../../../components/[weaponName]-page/Header'
import WeaponStats from '../../../components/[weaponName]-page/WeaponStats'
import { getWeaponByName, getWeapons } from '../../../lib/weapons'

export default function Weapon({ weapon }) {
  console.log(weapon)

  return (
    <Layout title={weapon.displayName} back='/weapons'>
      <Wrapper className='space-y-5'>
        <Header weapon={weapon} />
        <WeaponStats weapon={weapon} />
        {/* damage range -> */}
        {/* skins -> */}
      </Wrapper>
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
