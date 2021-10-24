import { agentToURL, getAgentsByName, parseAgentFromURL } from '../lib/agents'
import AgentPageLayout from '../components/agent-page/AgentPageLayout'
import { useRouter } from 'next/router'
import LineupsPage from '../components/agent-page/LineupsPage'
import { getMaps } from '../lib/maps'
import useObserver from '../hooks/useObserver'
import { db } from '../lib/firebase-client'

const Agent = ({ agent, maps, agentDoc }) => {
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
      agentDoc={agentDoc}
      headerRef={headerRef}
      headerVisible={headerVisible}
    >
      {tabMap.get(tabName)}
    </AgentPageLayout>
  )
}

export default Agent

export async function getServerSideProps(context) {
  const agentName = parseAgentFromURL(context.params.agent)
  const agent = await getAgentsByName(agentName)
  const maps = await getMaps()

  const agentSnapshot = await db
    .collection('agents')
    .doc(agentToURL(agent.displayName))
    .get()
  const agentDoc = agentSnapshot.data()

  const props = { agent, maps, agentDoc }

  // if tab already exist, dont redirect
  if (context.query.tab) return { props }

  // if tab not exist, redirect
  if (agentDoc.hasLineups) {
    return {
      props,
      redirect: {
        permanent: false,
        destination: `/${agentToURL(agent.displayName)}?tab=lineups`,
      },
    }
  } else {
    return {
      props,
      redirect: {
        permanent: false,
        destination: `/${agentToURL(agent.displayName)}?tab=abilities`,
      },
    }
  }
}
