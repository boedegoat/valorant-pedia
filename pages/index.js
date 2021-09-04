import Head from 'next/head'
import { Fragment } from 'react'
import Wrapper from '../components/Wrapper'
import SearchBar from '../components/SearchBar'
import AgentRole from '../components/AgentRole'
import SelectAgent from '../components/SelectAgent'

const Home = ({ agents, roles }) => {
  return (
    <Fragment>
      <Head>
        <title>Agents</title>
      </Head>

      <header>
        <Wrapper className='space-y-4'>
          <h1 className='text-2xl font-roboto font-black text-gray-900'>Agents</h1>
          <SearchBar placeholder='Search Agent' />
        </Wrapper>
      </header>

      {/* choose agent role */}
      <Wrapper className='py-5 flex space-x-4 overflow-x-auto scrollbar-hide'>
        {roles.map((role, index) => (
          <AgentRole key={index} role={role.name} icon={role.icon} />
        ))}
      </Wrapper>

      {/* select agent section */}
      {roles.map(({ name }) => (
        <section key={name}>
          <Wrapper>
            <h2 className='font-roboto font-bold text-2xl text-gray-700'>{name}</h2>
          </Wrapper>
          <Wrapper className='py-5 flex space-x-4 overflow-x-auto scrollbar-hide'>
            {agents
              .filter(({ role }) => role.displayName === name)
              .map((agent) => (
                <SelectAgent
                  key={agent.uuid}
                  src={agent.bustPortrait}
                  agentName={agent.displayName}
                  roleName={agent.role.displayName}
                  roleIcon={agent.role.displayIcon}
                />
              ))}
          </Wrapper>
        </section>
      ))}
    </Fragment>
  )
}

export default Home

export async function getServerSideProps() {
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
