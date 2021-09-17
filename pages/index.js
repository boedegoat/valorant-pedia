import { useState, useEffect, Fragment } from 'react'
import Wrapper from '../components/Wrapper'
import SearchBar from '../components/SearchBar'
import AgentRole from '../components/AgentRole'
import SelectAgentSection from '../components/home/SelectAgentSection'
import useScroll from '../hooks/useScroll'
import SearchResultsSection from '../components/home/SearchResultsSection'
import Layout from '../components/Layout'
import RoleFilterSection from '../components/home/RoleFilterSection'
import { getAgents, getRoles, getSearchResults } from '../lib/agents'

const Home = ({ agents, roles }) => {
  const [searchAgent, setSearchAgent] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [roleFilter, setRoleFilter] = useState('')
  // const showSearchBar = useScroll(100)

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
      <Wrapper className={`sticky transition-all duration-200 mt-4 z-10`}>
        <SearchBar
          placeholder='Search Agent'
          value={searchAgent}
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

export async function getStaticProps() {
  const agents = await getAgents()
  const roles = getRoles(agents)

  return {
    props: {
      agents,
      roles,
    },
  }
}
