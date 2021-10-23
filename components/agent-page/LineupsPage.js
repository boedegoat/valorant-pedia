import { db } from '../../lib/firebase-client'
import Wrapper from '../Wrapper'
import { ChevronRightIcon, SearchIcon } from '@heroicons/react/outline'
import LineupsList from './LineupsList'
import LineupsVideoModal from './LineupsVideoModal'
import { agentToURL } from '../../lib/agents'
import useToggle from '../../hooks/useToggle'
import LineupsFilterModal from './LineupsFilterModal'
import useObserver from '../../hooks/useObserver'
import LineupsMoreButton from './LineupsMoreButton'
import { useAgentPageContext } from './AgentPageLayout'
import { useEffect, useRef, useState } from 'react'
import useCollectionDataWithId from '../../hooks/useCollectionDataWithId'
import { useCollection } from 'react-firebase-hooks/firestore'
import LineupsTypeAndSite from './LineupsTypeAndSite'
import Image from 'next/image'

const Lineups = () => {
  const { agent, maps } = useAgentPageContext()

  const [showFilterModal, toggleShowFilterModal] = useToggle()
  const [showMoreButton, toggleShowMoreButton] = useToggle()

  // const [navRef, navVisible] = useObserver({ initVisible: true })

  // TODO : Make infinite scroll (limit = 8)
  const [lineupsQuery, setLineupsQuery] = useState(
    db.collection('lineups').where('agent', '==', agentToURL(agent.displayName))
  )
  const [lineups, lineupsLoading] = useCollectionDataWithId(lineupsQuery)

  const [lineupsMap, setLineupsMap] = useState('bind')
  const [lineupsType, setLineupsType] = useState('attacking')
  const [lineupsSite, setLineupsSite] = useState('a')

  return (
    <Wrapper>
      <div className='mt-8 grid grid-cols-2 gap-2'>
        <LineupsList
          agentName={agent.displayName}
          lineups={lineups}
          lineupsLoading={lineupsLoading}
          maps={maps}
        />
        {/* <LineupsVideoModal agentName={agent.displayName} lineups={lineups} /> */}
      </div>
      <div className='h-20'></div>

      <nav className='fixed bottom-0 left-0 right-0 bg-white px-2 pb-2'>
        <div className='bg-white shadow-xl border rounded-lg p-1 flex'>
          <button className='py-2 bg-[#EDEDED] rounded-sm flex-grow px-2 flex items-center'>
            <div className='flex space-x-2 items-center'>
              <Image
                src={maps.find((m) => m.displayName.toLowerCase() === lineupsMap).splash}
                width={26}
                height={26}
                layout='fixed'
                className='rounded-full'
              />
              <h1 className='text-lg font-black uppercase'>{lineupsMap}</h1>
              <LineupsTypeAndSite type={lineupsType} site={lineupsSite} black />
            </div>
            <ChevronRightIcon className='w-[32px] h-[32px] text-gray-800 ml-auto' />
          </button>
          <button className='px-5'>
            <SearchIcon className='w-[32px] h-[32px] text-gray-800' />
          </button>
        </div>
      </nav>

      {/* <LineupsFilterModal
        show={showFilterModal}
        onClose={toggleShowFilterModal}
        maps={maps}
        lineupsFilter={lineupsFilter}
        setLineupsFilter={setLineupsFilter}
      />

      <LineupsMoreButton
        showMoreButton={showMoreButton}
        toggleShowMoreButton={toggleShowMoreButton}
        toggleShowFilterModal={toggleShowFilterModal}
        navVisible={navVisible}
        navRef={navRef}
      /> */}
    </Wrapper>
  )
}

export default Lineups
