import Layout from 'components/global/Layout'
import Wrapper from 'components/global/Wrapper'
import Header from 'components/weapon-page/Header'
import WeaponStats from 'components/weapon-page/WeaponStats'
import { getWeaponByName, getWeapons } from 'lib/weapons'
import Link from 'components/global/Link'

export default function Weapon({ weapon }) {
  return (
    <Layout title={weapon.displayName} back='/weapons'>
      <Wrapper className='space-y-5'>
        <Header weapon={weapon} />

        <Link
          href={`/skins/${weapon.displayName.toLowerCase()}`}
          className='block border p-3 rounded-md'
        >
          <h3 className='font-bold text-lg'>✨ Skins &#8594;</h3>
          <p className='text-gray-700'>See all {weapon.displayName} skins available</p>
        </Link>

        <WeaponStats weapon={weapon} />
        {/* damage range */}
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
