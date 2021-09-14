import Layout from '../Layout'
import AgentHeader from './AgentHeader'
import Wrapper from '../Wrapper'
import ChangeTab from './ChangeTab'
import Image from 'next/image'
import useObserver from '../../hooks/useObserver'
import { useRef } from 'react'

const AgentPageLayout = ({ children, agent }) => {
  const headerRef = useRef()
  const [headerEntry] = useObserver(headerRef)

  return (
    <Layout title={`${agent.displayName}'s Homepage`} back='/'>
      <AgentHeader agent={agent} headerRef={headerRef} />

      {/* select tab */}
      <Wrapper
        className={`mt-2 py-5 h-14 flex items-center space-x-4 overflow-x-auto scrollbar-hide sticky top-0 z-50 bg-white bg-opacity-70 backdrop-blur-sm mb-6
        ${headerEntry?.isIntersecting ? '' : 'shadow-md'}
        `}
      >
        <button
          className={`
          ${headerEntry?.isIntersecting ? 'hidden' : 'block'}
          relative w-8 h-8 bg-gray-200 rounded-full overflow-hidden`}
        >
          <Image src={agent.displayIconSmall} layout='fill' />
        </button>

        <div
          className={`
          flex space-x-4 absolute transition-all h-full
          ${headerEntry?.isIntersecting ? 'left-4' : 'left-12'}
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
