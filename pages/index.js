import { useState, useEffect, Fragment } from 'react'
import Wrapper from '../components/Wrapper'
import SearchBar from '../components/SearchBar'
import AgentRole from '../components/AgentRole'
import SelectAgentSection from '../components/SelectAgentSection'
import useScroll from '../hooks/useScroll'
import SearchResultsSection from '../components/SearchResultsSection'
import { getSession } from 'next-auth/client'
import Layout from '../components/Layout'
import RoleFilterSection from '../components/RoleFilterSection'
import { getAgents, getRoles, getSearchResults } from '../lib/agents'

const Home = ({ agents, roles }) => {
  const [searchAgent, setSearchAgent] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [roleFilter, setRoleFilter] = useState('')
  const showSearchBar = useScroll(100)

  useEffect(() => {
    if (!searchAgent) return
    setSearchResults(getSearchResults({ agents, searchAgent, roleFilter }))
  }, [searchAgent])

  return (
    <Layout title='Agents'>
      <header>
        <Wrapper>
          <h1 className='text-2xl font-roboto font-black text-gray-900'>Agents</h1>
        </Wrapper>
      </header>

      {/* search bar */}
      <Wrapper
        className={`sticky transition-all duration-200 ${
          showSearchBar ? 'top-2' : '-top-20'
        } mt-4 z-10`}
      >
        <SearchBar
          placeholder='Search Agent'
          value={searchAgent}
          className={`${
            showSearchBar ? 'bg-opacity-80 shadow-2xl backdrop-blur-sm' : ''
          }`}
          onChange={(e) => {
            setSearchAgent(e.target.value)
          }}
        />
      </Wrapper>

      {/* home body */}
      <main className='py-5'>
        {searchAgent && <SearchResultsSection searchResults={searchResults} />}
        {!searchAgent && (
          <Fragment>
            {/* choose agent role */}
            <Wrapper className='py-5 flex space-x-4 overflow-x-auto scrollbar-hide'>
              {roles.map((role, index) => (
                <AgentRole
                  key={index}
                  role={role.name}
                  icon={role.icon}
                  roleFilter={roleFilter}
                  setRoleFilter={setRoleFilter}
                />
              ))}
            </Wrapper>

            {roleFilter && <RoleFilterSection roleFilter={roleFilter} agents={agents} />}
            {!roleFilter && <SelectAgentSection roles={roles} agents={agents} />}
          </Fragment>
        )}
      </main>
    </Layout>
  )
}

export default Home

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  const agents = await getAgents()
  const roles = getRoles(agents)

  return {
    props: {
      agents,
      roles,
    },
  }
}
