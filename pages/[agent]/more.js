import Image from 'next/image'
import AgentPageLayout from '../../components/agent-page/AgentPageLayout'
import { getStaticAgentPaths, getStaticAgent } from '../../lib/agents'

const More = ({ agent }) => {
  return <AgentPageLayout agent={agent}></AgentPageLayout>
}

export default More

export async function getStaticPaths() {
  return await getStaticAgentPaths()
}

export async function getStaticProps(context) {
  return await getStaticAgent(context)
}
