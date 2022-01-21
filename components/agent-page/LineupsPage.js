import { db } from 'lib/firebase-client'
import Wrapper from 'components/global/Wrapper'
import LineupsList from './LineupsList'
import { agentToURL } from 'lib/agents'
import { useAgentPageContext } from './AgentPageLayout'
import { useAppContext } from 'context/appContext'
import { useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import LineupsNav from './LineupsNav'
import LineupsSources from './LineupsSource'

const LineupsPage = () => {
  const [
    {
      lineupsState: { filter },
    },
    dispatch,
  ] = useAppContext()
  const { agent, maps } = useAgentPageContext()

  const AgentLineups = db
    .collection('lineups')
    .where('agent', '==', agentToURL(agent.displayName))
    .limit(4)

  // to update query each user open this page
  useEffect(() => {
    dispatch({
      type: 'UPDATE_FILTER_LINEUPS_QUERY',
      pay: { query: AgentLineups },
    })
  }, [])

  const [lineups, lineupsLoading] = useCollection(filter.query ?? AgentLineups)

  return (
    <Wrapper>
      <LineupsSources />
      <LineupsList lineups={lineups} lineupsLoading={lineupsLoading} />
      <LineupsNav maps={maps} filter={filter} AgentLineups={AgentLineups} />
    </Wrapper>
  )
}

export default LineupsPage
