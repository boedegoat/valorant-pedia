import { getAgents, getAgentsByName, parseAgentFromURL } from '../../lib/agents'
import AgentPageLayout from '../../components/agent-page/AgentPageLayout'

const Agent = ({ agent }) => {
  return <AgentPageLayout agent={agent}></AgentPageLayout>
}

export default Agent

export async function getStaticPaths() {
  const agents = await getAgents()
  const paths = agents.map(({ displayName }) => ({
    params: {
      agent: displayName.toLowerCase().replace(/\//g, '-'),
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
