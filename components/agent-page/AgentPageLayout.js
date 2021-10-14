import Layout from '../Layout'
import AgentHeader from './AgentHeader'
import Wrapper from '../Wrapper'
import ChangeTab from './ChangeTab'
import Image from 'next/image'
import useObserver from '../../hooks/useObserver'
import { useContext, createContext } from 'react'

const AgentPageContext = createContext({})

export function useAgentPageContext() {
  return useContext(AgentPageContext)
}

const AgentPageLayout = ({ children, ...props }) => {
  const { agent } = props
  const [headerRef, headerVisible] = useObserver({ initVisible: true })

  return (
    <Layout title={`${agent.displayName}'s Homepage`} back='/'>
      <AgentHeader agent={agent} headerRef={headerRef} />

      {/* select tab */}
      <Wrapper
        className={`mt-2 py-5 h-12 flex items-center space-x-4 overflow-x-auto scrollbar-hide sticky top-0 z-50 bg-white mb-6
        ${headerVisible ? '' : 'shadow-md'}
        `}
      >
        <button
          className={`
            ${headerVisible ? 'hidden' : 'block'}
            relative w-8 h-8 bg-gray-200 rounded-full overflow-hidden
          `}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Image src={agent.displayIconSmall} layout='fill' />
        </button>

        <div
          className={`
            flex space-x-4 absolute transition-all h-full
            ${headerVisible ? 'left-4' : 'left-12'}
          `}
        >
          <ChangeTab agentName={agent.displayName} to='lineups' />
          <ChangeTab agentName={agent.displayName} to='abilities' />
          <ChangeTab agentName={agent.displayName} to='more' />
        </div>
      </Wrapper>
      <AgentPageContext.Provider value={props}>{children}</AgentPageContext.Provider>
    </Layout>
  )
}

export default AgentPageLayout
