import { useRouter } from 'next/router'
import Layout from 'components/global/Layout'
import Wrapper from 'components/global/Wrapper'
import { getWeapons, getWeaponSkinsByName } from 'lib/weapons'
import { toTitleCase } from 'lib/utils'
import SearchBar from 'components/global/SearchBar'
import SkinsList from 'components/skin-page/SkinsList'
import useQuery from 'hooks/useQuery'
import SearchResultsLabel from 'components/global/SearchResultsLabel'

export default function WeaponSkins({ weaponSkins: weaponSkinsData, weaponName }) {
  const router = useRouter()
  // prettier-ignore
  const [weaponSkins, { search: [searchWeaponSkins, setSearchWeaponSkins] }] = useQuery(weaponSkinsData, {
    search: { field: 'displayName' }
  })

  return (
    <Layout back={`/weapons/${weaponName}`}>
      <header>
        <Wrapper>
          <h1 className='font-extrabold text-3xl'>{toTitleCase(weaponName)} skins</h1>
        </Wrapper>
      </header>
      <Wrapper className='z-20 sticky top-0 bg-white mb-4 py-4 border-b shadow-sm'>
        <SearchBar
          placeholder='search skins'
          value={searchWeaponSkins}
          onChange={(e) => setSearchWeaponSkins(e.target.value)}
        />
      </Wrapper>
      <main>
        {searchWeaponSkins && (
          <SearchResultsLabel data={weaponSkins} searchInput={searchWeaponSkins} />
        )}
        <SkinsList weaponSkins={weaponSkins} weaponName={weaponName} />
      </main>
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
  const weaponSkins = await getWeaponSkinsByName(weaponName)
  const props = { weaponSkins, weaponName }
  return { props, revalidate: 60 }
}
