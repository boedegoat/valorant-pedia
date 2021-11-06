import Layout from '../global/Layout'
import AgentHeader from './AgentHeader'
import Wrapper from '../global/Wrapper'
import ChangeTab from './ChangeTab'
import Image from 'next/image'
import { useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'

const AgentPageContext = createContext({})

export function useAgentPageContext() {
  return useContext(AgentPageContext)
}

const AgentPageLayout = ({ children, ...props }) => {
  const { agent, agentDoc, headerRef, headerVisible } = props
  const router = useRouter()

  return (
    <Layout title={`${agent.displayName}'s Homepage`} back='/' hideMainMenu>
      <AgentHeader agent={agent} headerRef={headerRef} agentDoc={agentDoc} />

      {/* select tab */}
      <Wrapper
        className={`mt-2 py-5 h-12 flex items-center space-x-4 overflow-x-auto scrollbar-hide sticky top-0 z-50 bg-white mb-6
        ${headerVisible ? '' : 'shadow-md'}
        `}
      >
        {!headerVisible && (
          <button
            onClick={() => router.push('/')}
            className='flex items-center font-bold'
          >
            <ArrowNarrowLeftIcon className='h-5 w-5 text-gray-800' />
          </button>
        )}
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
            flex space-x-4 absolute h-full
            ${headerVisible ? 'left-4' : 'left-20'}
          `}
        >
          {agentDoc?.hasLineups && (
            <ChangeTab agentName={agent.displayName} to='lineups' />
          )}
          <ChangeTab agentName={agent.displayName} to='abilities' />
          <ChangeTab agentName={agent.displayName} to='more' />
        </div>
      </Wrapper>
      <AgentPageContext.Provider value={props}>{children}</AgentPageContext.Provider>
      <div className='h-20' />
    </Layout>
  )
}

export default AgentPageLayout
