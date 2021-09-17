import Layout from '../Layout'
import AgentHeader from './AgentHeader'
import Wrapper from '../Wrapper'
import ChangeTab from './ChangeTab'
import Image from 'next/image'
import useObserver from '../../hooks/useObserver'
import { useRef } from 'react'

const AgentPageLayout = ({ children, agent }) => {
  const headerRef = useRef()
  const [headerEntry, loading] = useObserver(headerRef)

  return (
    <Layout title={`${agent.displayName}'s Homepage`} back='/'>
      <AgentHeader agent={agent} headerRef={headerRef} />

      {/* select tab */}
      <Wrapper
        className={`mt-2 py-5 h-12 flex items-center space-x-4 overflow-x-auto scrollbar-hide sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm mb-6
        ${loading || headerEntry?.isIntersecting ? '' : 'shadow-md'}
        `}
      >
        <button
          className={`
            ${loading || headerEntry?.isIntersecting ? 'hidden' : 'block'}
            relative w-8 h-8 bg-gray-200 rounded-full overflow-hidden
          `}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Image src={agent.displayIconSmall} layout='fill' />
        </button>

        <div
          className={`
            flex space-x-4 absolute transition-all h-full
            ${loading || headerEntry?.isIntersecting ? 'left-4' : 'left-12'}
          `}
        >
          <ChangeTab agentName={agent.displayName} to='lineups' />
          <ChangeTab agentName={agent.displayName} to='abilities' />
          <ChangeTab agentName={agent.displayName} to='more' />
        </div>
      </Wrapper>
      {children}
    </Layout>
  )
}

export default AgentPageLayout
