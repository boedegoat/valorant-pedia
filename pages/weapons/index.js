import { useState } from 'react'
import Footer from 'components/global/Footer'
import Layout from 'components/global/Layout'
import SearchBar from 'components/global/SearchBar'
import Wrapper from 'components/global/Wrapper'
import FilterCategory from 'components/weapon-page/FilterCategory'
import SearchResultsLabel from 'components/global/SearchResultsLabel'
import WeaponsList from 'components/weapon-page/WeaponsList'
import WeaponsListByCategory from 'components/weapon-page/WeaponsListByCategory'
import useQuery from 'hooks/useQuery'
import { getCategories, getWeapons } from 'lib/weapons'

const Weapons = ({ weapons: weaponsData, categories }) => {
  const [filterCategory, setFilterCategory] = useState('')
  // prettier-ignore
  const [weapons, { search: [searchWeapons, setSearchWeapons] }] = useQuery(weaponsData, {
    search: { field: 'displayName' }
  })

  return (
    <Layout title='Weapons'>
      <header>
        <Wrapper>
          <h1 className='page-main-header'>Weapons</h1>
        </Wrapper>
      </header>

      {/* search bar */}
      <Wrapper className={`mt-4 z-10`}>
        <SearchBar
          placeholder='Search Weapon'
          value={searchWeapons}
          onChange={(e) => {
            setSearchWeapons(e.target.value)
          }}
        />
      </Wrapper>

      <main>
        <FilterCategory
          categories={categories}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
        {searchWeapons && (
          <SearchResultsLabel data={weapons} searchInput={searchWeapons} />
        )}
        {!filterCategory ? (
          <WeaponsList weapons={weapons} />
        ) : (
          <WeaponsListByCategory weapons={weapons} filterCategory={filterCategory} />
        )}
      </main>
      <Footer />
    </Layout>
  )
}

export default Weapons

export async function getStaticProps() {
  const weapons = await getWeapons()
  const categories = getCategories(weapons)
  const props = { weapons, categories }
  return { props, revalidate: 60 }
}
