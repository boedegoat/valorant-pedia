import { agentToURL, getAgents, getAgentsByName, parseAgentFromURL } from '../lib/agents'
import AgentPageLayout from '../components/agent-page/AgentPageLayout'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect } from 'react'
import LineupsPage from '../components/agent-page/LineupsPage'

const Agent = ({ agent }) => {
  const router = useRouter()

  const tab = router.query.tab

  console.log('render')

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
        return <LineupsPage agent={agent} />
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

  return {
    props: { agent },
  }
}
