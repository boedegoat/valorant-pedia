import { db } from '../../lib/firebase-client'
import Wrapper from '../Wrapper'
import { SearchIcon, AdjustmentsIcon } from '@heroicons/react/outline'
import LineupsList from './LineupsList'
import LineupsVideoModal from './LineupsVideoModal'
import { agentToURL } from '../../lib/agents'
import useToggle from '../../hooks/useToggle'
import LineupsFilterModal from './LineupsFilterModal'
import useObserver from '../../hooks/useObserver'
import LineupsMoreButton from './LineupsMoreButton'
import { useAgentPageContext } from './AgentPageLayout'
import { useEffect, useState } from 'react'
import useCollectionDataWithId from '../../hooks/useCollectionDataWithId'

const Lineups = () => {
  const { agent, maps } = useAgentPageContext()

  const [showFilterModal, toggleShowFilterModal] = useToggle()
  const [showMoreButton, toggleShowMoreButton] = useToggle()

  // const [navRef, navVisible] = useObserver({ initVisible: true })

  const [lineupsQuery, setLineupsQuery] = useState(
    db.collection('lineups').where('agent', '==', agentToURL(agent.displayName)).limit(12)
  )
  const [lineups, lineupsLoading] = useCollectionDataWithId(lineupsQuery)

  return (
    <Wrapper>
      {/* <nav
        ref={navRef}
        className={`bg-white justify-between items-center shadow-md rounded-md divide-y`}
      >
        <div className='px-3 flex items-center space-x-2'>
          <SearchIcon className='w-5 h-5 text-gray-400 flex-shrink-0' />
          <input
            className='flex-grow border-0 py-4 bg-transparent focus:outline-none focus:ring-0 placeholder-gray-400 text-lg'
            placeholder='Search lineups'
            value={lineupsFilter.title.$search}
            onChange={handleSearch}
          />
          <button
            className='text-sm font-semibold text-gray-400'
            onClick={toggleShowFilterModal}
          >
            <AdjustmentsIcon className='w-6 h-6 rotate-90' />
          </button>
        </div>
        <LineupsFilterList lineupsFilter={lineupsFilter} />
      </nav> */}

      <div className='mt-8 grid grid-cols-2 gap-2'>
        <LineupsList
          agentName={agent.displayName}
          lineups={lineups}
          lineupsLoading={lineupsLoading}
          maps={maps}
        />
        {/* <LineupsVideoModal agentName={agent.displayName} lineups={lineups} /> */}
      </div>

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
