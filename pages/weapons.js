import { useState } from 'react'
import Layout from '../components/global/Layout'
import SearchBar from '../components/global/SearchBar'
import Wrapper from '../components/global/Wrapper'
import { getWeapons } from '../lib/weapons'

const Weapons = ({ weapons }) => {
  const [searchWeapon, setSearchWeapon] = useState('')

  console.log(weapons)

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
          value={searchWeapon}
          onChange={(e) => {
            setSearchWeapon(e.target.value)
          }}
        />
      </Wrapper>
    </Layout>
  )
}

export default Weapons

export async function getStaticProps() {
  const weapons = await getWeapons()
  const props = { weapons }
  return { props, revalidate: 60 }
}
