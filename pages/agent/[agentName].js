import Layout from '../../components/Layout'
import { getAgents, getAgentsByName } from '../../lib/agents'
import AgentHeader from '../../components/agent-page/AgentHeader'
import Wrapper from '../../components/Wrapper'
import { useRouter } from 'next/router'
import ChangeTabButton from '../../components/agent-page/ChangeTabButton'
import useGlobalContext from '../../hooks/useConsumer'
import { useEffect } from 'react'

const Agent = ({ agent }) => {
  const router = useRouter()
  const [{ tab }, dispatch] = useGlobalContext()

  function updateTab(tabName) {
    router.push({
      pathname: `/agent/${agent.displayName.toLowerCase().replace(/\//g, '-')}`,
      query: { tab: tabName },
    })
    dispatch({ type: 'UPDATE_TAB', tab: tabName })
  }

  useEffect(() => {
    if (!router.query.tab) {
      updateTab(tab)
    }
  }, [])

  return (
    <Layout title={`${agent.displayName}'s Homepage`}>
      <AgentHeader agent={agent} />

      <section className='mt-5'>
        <Wrapper className='flex space-x-4 overflow-x-auto scrollbar-hide'>
          <ChangeTabButton value='lineups' onClick={updateTab}>
            Lineups
          </ChangeTabButton>
          <ChangeTabButton value='abilities' onClick={updateTab}>
            Abilities
          </ChangeTabButton>
        </Wrapper>
      </section>
    </Layout>
  )
}

export default Agent

export async function getStaticPaths() {
  const agents = await getAgents()
  const paths = agents.map(({ displayName }) => ({
    params: {
      agentName: displayName.toLowerCase().replace(/\//g, '-'),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const agentName = context.params.agentName.replace(/-/g, '/')
  const agent = await getAgentsByName(agentName)

  return {
    props: { agent },
  }
}
