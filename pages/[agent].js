import { agentToURL, getAgents, getAgentsByName, parseAgentFromURL } from '../lib/agents'
import AgentPageLayout from '../components/agent-page/AgentPageLayout'
import { useRouter } from 'next/router'
import { useLayoutEffect } from 'react'
import LineupsPage from '../components/agent-page/LineupsPage'
import { getMaps } from '../lib/maps'

const Agent = ({ agent, maps }) => {
  const router = useRouter()

  const tab = router.query.tab

  useLayoutEffect(() => {
    if (!router.query.tab)
      router.push(
        {
          pathname: `/${agentToURL(agent.displayName)}`,
          query: { tab: 'lineups' },
        },
        undefined,
        { shallow: true }
      )
  }, [router.query.tab])

  function renderTabPage() {
    switch (tab) {
      case 'lineups':
        return <LineupsPage agent={agent} maps={maps} />
    }
  }

  return <AgentPageLayout agent={agent}>{renderTabPage()}</AgentPageLayout>
}

export default Agent

export async function getStaticPaths() {
  const agents = await getAgents()
  const paths = agents.map(({ displayName }) => ({
    params: {
      agent: agentToURL(displayName),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const agentName = parseAgentFromURL(context.params.agent)
  const agent = await getAgentsByName(agentName)
  const maps = await getMaps()

  return {
    props: { agent, maps },
  }
}
