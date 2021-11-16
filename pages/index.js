import { useState, useEffect, Fragment } from 'react'
import Wrapper from '../components/global/Wrapper'
import SearchBar from '../components/global/SearchBar'
import AgentRole from '../components/global/AgentRole'
import SelectAgentSection from '../components/home/SelectAgentSection'
import SearchResultsSection from '../components/home/SearchResultsSection'
import Layout from '../components/global/Layout'
import RoleFilterSection from '../components/home/RoleFilterSection'
import { agentToURL, getAgents, getRoles, getSearchResults } from '../lib/agents'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../lib/firebase-client'
import Footer from '../components/global/Footer'
import { getCollectionDataWithId, getDocument } from '../lib/utils'

const Home = ({ agents, roles, agentsDoc: agentsDocServer }) => {
  const [searchAgent, setSearchAgent] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [roleFilter, setRoleFilter] = useState('')
  const [agentsDocClient] = useCollectionData(db.collection('agents'))
  const agentsDoc = agentsDocClient || agentsDocServer

  useEffect(() => {
    if (!searchAgent) return
    setSearchResults(getSearchResults({ agents, searchAgent, roleFilter }))
  }, [searchAgent])

  return (
    <Layout title='Agents'>
      <header>
        <Wrapper>
          <h1 className='page-main-header'>Agents</h1>
        </Wrapper>
      </header>

      {/* search bar */}
      <Wrapper className={`mt-4 z-10`}>
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
        {searchAgent && (
          <SearchResultsSection searchResults={searchResults} agentsDoc={agentsDoc} />
        )}
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

            {roleFilter ? (
              <RoleFilterSection
                roleFilter={roleFilter}
                agents={agents}
                agentsDoc={agentsDoc}
              />
            ) : (
              <SelectAgentSection roles={roles} agents={agents} agentsDoc={agentsDoc} />
            )}
          </Fragment>
        )}
      </main>
      <Footer />
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const agents = await getAgents()
  const roles = getRoles(agents)

  const agentsRef = db.collection('agents')
  const agentsDoc = await getCollectionDataWithId(agentsRef)

  // make sure agents API match with agents in firestore
  await Promise.all(
    agents.map(async (agent) => {
      const agentName = agentToURL(agent.displayName)
      const agentSnapshot = await getDocument(agentsRef, agentName)
      if (!agentSnapshot.exists) {
        console.log(`creating firestore doc for agents/${agentName}`)
        await agentsRef
          .doc(agentName)
          .set({ name: agentName, favorites: [] }, { merge: true })
      }
    })
  )

  return {
    props: {
      agentsDoc,
      agents,
      roles,
    },
    revalidate: 1,
  }
}
