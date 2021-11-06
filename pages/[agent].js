import { agentToURL, getAgents, getAgentsByName, parseAgentFromURL } from '../lib/agents'
import AgentPageLayout from '../components/agent-page/AgentPageLayout'
import { useRouter } from 'next/router'
import LineupsPage from '../components/agent-page/LineupsPage'
import { getMaps } from '../lib/maps'
import useObserver from '../hooks/useObserver'
import { db } from '../lib/firebase-client'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import AbilitiesPage from '../components/agent-page/AbilitiesPage'
import MorePage from '../components/agent-page/MorePage'
import { getDocumentDataWithId } from '../lib/utils'

const Agent = ({ agent, maps, agentDoc: agentDocServer }) => {
  const router = useRouter()

  const tabName = router.query.tab
  const [headerRef, headerVisible] = useObserver({ initVisible: true })
  const [agentDocClient] = useDocumentData(
    db.collection('agents').doc(agentToURL(agent.displayName))
  )

  const agentDoc = agentDocClient || agentDocServer

  const tabMap = new Map([
    ['lineups', <LineupsPage key='lineupsPage' />],
    ['abilities', <AbilitiesPage key='abilitiesPage' />],
    ['more', <MorePage key='morePage' />],
  ])

  return (
    <AgentPageLayout
      agent={agent}
      maps={maps}
      agentDoc={agentDoc}
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
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const agentName = parseAgentFromURL(context.params.agent)
  const agent = await getAgentsByName(agentName)

  if (!agent) {
    return { notFound: true }
  }

  const agentsRef = db.collection('agents')
  const agentDoc = await getDocumentDataWithId(agentsRef, agentToURL(agentName))

  const maps = await getMaps()

  const props = { agent, maps, agentDoc }
  return { props, revalidate: 1 }
}
