import Layout from '../../components/Layout'
import { getAgentsByName } from '../../lib/agents'
import AgentHeader from '../../components/agent-page/AgentHeader'
import Wrapper from '../../components/Wrapper'
import { useRouter } from 'next/router'
import useGlobalContext from '../../hooks/useConsumer'
import { useEffect } from 'react'
import SelectSection from '../../components/agent-page/SelectSection'

const Agent = ({ agent, _section }) => {
  const router = useRouter()
  const [{ section }, dispatch] = useGlobalContext()

  function updateSection(name) {
    router.push({
      pathname: `/agent/${agent.displayName.toLowerCase().replace(/\//g, '-')}`,
      query: { section: encodeURI(name) },
    })
    dispatch({ type: 'UPDATE_SECTION', section: name })
  }

  useEffect(() => {
    if (!_section) {
      updateSection(section)
    }
    console.log(agent, _section)
  }, [])

  return (
    <Layout title={`${agent.displayName}'s Homepage`}>
      <AgentHeader agent={agent} />

      <section className='mt-5'>
        <Wrapper className='flex space-x-4 overflow-x-auto scrollbar-hide'>
          <SelectSection value='lineups' section={_section} updater={updateSection}>
            Lineups
          </SelectSection>
          <SelectSection value='abilities' section={_section} updater={updateSection}>
            Abilities
          </SelectSection>
          <SelectSection value='data' section={_section} updater={updateSection}>
            Data
          </SelectSection>
          <SelectSection value='voice' section={_section} updater={updateSection}>
            Voice
          </SelectSection>
        </Wrapper>
      </section>
    </Layout>
  )
}

export default Agent

export async function getServerSideProps(context) {
  const agentName = context.params.agentName.replace(/-/g, '/')
  const agent = await getAgentsByName(agentName)
  const section = context.query.section || null

  return {
    props: {
      agent,
      _section: section,
    },
  }
}
