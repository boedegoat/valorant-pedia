import { db } from '../../lib/firebase-client'
import Wrapper from '../global/Wrapper'
import { ChevronRightIcon, SearchIcon } from '@heroicons/react/outline'
import LineupsList from './LineupsList'
import { agentToURL } from '../../lib/agents'
import useToggle from '../../hooks/useToggle'
import LineupsFilterModal from './LineupsFilterModal'
import { useAgentPageContext } from './AgentPageLayout'
import useCollectionDataWithId from '../../hooks/useCollectionDataWithId'
import LineupsTypeAndSite from './LineupsTypeAndSite'
import Image from 'next/image'
import { useAppContext } from '../../context/appContext'

const LineupsPage = () => {
  const [
    {
      lineupsState: { filter },
    },
  ] = useAppContext()
  const { agent, maps } = useAgentPageContext()
  const [showFilterModal, toggleShowFilterModal] = useToggle()

  const AgentLineups = db
    .collection('lineups')
    .where('agent', '==', agentToURL(agent.displayName))

  // TODO : Make infinite scroll (limit = 8)
  const [lineups, lineupsLoading] = useCollectionDataWithId(filter.query ?? AgentLineups)

  return (
    <Wrapper>
      <div className='mt-8 grid grid-cols-2 gap-2'>
        <LineupsList
          agentName={agent.displayName}
          lineups={lineups}
          lineupsLoading={lineupsLoading}
        />
      </div>

      <nav className='fixed bottom-0 left-0 right-0 bg-white px-2 pb-2'>
        <div className='bg-white shadow-xl border rounded-lg p-1 flex'>
          {/* open filter button */}
          <button
            className='py-2 bg-[#EDEDED] rounded-sm flex-grow px-2 flex items-center'
            onClick={toggleShowFilterModal}
          >
            <div className='flex space-x-2 items-center'>
              {!filter.type && !filter.site && !filter.map && (
                <h1 className='text-lg font-black uppercase text-gray-800'>
                  No filter applied
                </h1>
              )}
              {filter.map && (
                <>
                  <Image
                    src={
                      maps.find((m) => m.displayName.toLowerCase() === filter.map).splash
                    }
                    alt={
                      maps.find((m) => m.displayName.toLowerCase() === filter.map)
                        .displayName
                    }
                    width={26}
                    height={26}
                    layout='fixed'
                    className='rounded-full'
                  />
                  <h1 className='text-lg font-black uppercase'>{filter.map}</h1>
                </>
              )}
              <LineupsTypeAndSite type={filter.type} site={filter.site} black />
            </div>
            <ChevronRightIcon className='w-[32px] h-[32px] text-gray-800 ml-auto' />
          </button>
          {/* search button */}
          <button className='px-5'>
            <SearchIcon className='w-[32px] h-[32px] text-gray-800' />
          </button>
        </div>
      </nav>

      <LineupsFilterModal
        show={showFilterModal}
        onClose={toggleShowFilterModal}
        maps={maps}
        AgentLineups={AgentLineups}
      />
    </Wrapper>
  )
}

export default LineupsPage
