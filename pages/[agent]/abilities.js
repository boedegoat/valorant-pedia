import Image from 'next/image'
import AgentPageLayout from '../../components/agent-page/AgentPageLayout'
import { getStaticAgentPaths, getStaticAgent } from '../../lib/agents'

const Abilities = ({ agent }) => {
  return <AgentPageLayout agent={agent}></AgentPageLayout>
}

export default Abilities

export async function getStaticPaths() {
  return await getStaticAgentPaths()
}

export async function getStaticProps(context) {
  return await getStaticAgent(context)
}
