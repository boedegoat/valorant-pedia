import Image from 'next/image'
import AgentPageLayout from '../../components/agent-page/AgentPageLayout'
import { getStaticAgentPaths, getStaticAgent } from '../../lib/agents'
import useScroll from '../../hooks/useScroll'

const Abilities = ({ agent }) => {
  const show = useScroll(1)

  return <AgentPageLayout agent={agent}></AgentPageLayout>
}

export default Abilities

export async function getStaticPaths() {
  return await getStaticAgentPaths()
}

export async function getStaticProps(context) {
  return await getStaticAgent(context)
}
