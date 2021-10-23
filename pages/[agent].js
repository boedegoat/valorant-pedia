import { agentToURL, getAgents, getAgentsByName, parseAgentFromURL } from '../lib/agents'
import AgentPageLayout from '../components/agent-page/AgentPageLayout'
import { useRouter } from 'next/router'
import LineupsPage from '../components/agent-page/LineupsPage'
import { getMaps } from '../lib/maps'
import useObserver from '../hooks/useObserver'

const Agent = ({ agent, maps }) => {
  const router = useRouter()
  const tabName = router.query.tab
  const [headerRef, headerVisible] = useObserver({ initVisible: true })

  // prettier-ignore
  const tabMap = new Map([
    ['lineups', <LineupsPage />],
  ])
  return (
    <AgentPageLayout
      agent={agent}
      maps={maps}
      headerRef={headerRef}
      headerVisible={headerVisible}
    >
      {tabMap.get(tabName)}
    </AgentPageLayout>
  )
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
