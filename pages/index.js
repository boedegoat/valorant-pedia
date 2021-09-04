import Head from 'next/head'
import { Fragment } from 'react'
import Wrapper from '../components/Wrapper'
import SearchBar from '../components/SearchBar'

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Agents</title>
      </Head>
      <Wrapper>
        <header className='space-y-4'>
          <h1 className='text-2xl font-roboto font-black'>Agents</h1>
          <SearchBar placeholder='Search Agent' />
        </header>
      </Wrapper>
    </Fragment>
  )
}

export default Home
