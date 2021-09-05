import { useState, useEffect, Fragment } from 'react'
import Wrapper from '../components/Wrapper'
import SearchBar from '../components/SearchBar'
import AgentRole from '../components/AgentRole'
import SelectAgentSection from '../components/SelectAgentSection'
import useScroll from '../hooks/useScroll'
import SearchResultsSection from '../components/SearchResultsSection'
import { getSession } from 'next-auth/client'
import Layout from '../components/Layout'

const Home = ({ agents, roles }) => {
  const [searchAgent, setSearchAgent] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const showSearchBar = useScroll(100)

  useEffect(() => {
    searchAgent &&
      setSearchResults(
        agents
          .filter(({ displayName }) => displayName.toLowerCase().includes(searchAgent))
          .sort(({ displayName: name1 }, { displayName: name2 }) => {
            if (name1.toLowerCase().startsWith(searchAgent)) return -1
            if (name2.toLowerCase().startsWith(searchAgent)) return 1
            return 0
          })
      )
  }, [searchAgent])

  return (
    <Layout>
      <Layout.Head>
        <title>Agents</title>
      </Layout.Head>

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
        {searchAgent ? (
          <SearchResultsSection searchResults={searchResults} />
        ) : (
          <Fragment>
            {/* choose agent role */}
            <Wrapper className='py-5 flex space-x-4 overflow-x-auto scrollbar-hide'>
              {roles.map((role, index) => (
                <AgentRole key={index} role={role.name} icon={role.icon} />
              ))}
            </Wrapper>

            <SelectAgentSection roles={roles} agents={agents} />
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

  const fetchAgents = await fetch('https://valorant-api.com/v1/agents')
  const agents = (await fetchAgents.json()).data
    .filter(({ role }) => role)
    .sort(({ displayName: a }, { displayName: b }) => {
      if (a > b) return 1
      if (a < b) return -1
      return 0
    })

  function findRole(role) {
    return agents.find(({ role: agentRole }) => agentRole.displayName === role).role
  }

  const roles = [
    {
      name: 'Duelist',
      description: findRole('Duelist').description,
      icon: findRole('Duelist').displayIcon,
    },
    {
      name: 'Controller',
      description: findRole('Controller').description,
      icon: findRole('Controller').displayIcon,
    },
    {
      name: 'Sentinel',
      description: findRole('Sentinel').description,
      icon: findRole('Sentinel').displayIcon,
    },
    {
      name: 'Initiator',
      description: findRole('Initiator').description,
      icon: findRole('Initiator').displayIcon,
    },
  ]
  return {
    props: { agents, roles },
  }
}
