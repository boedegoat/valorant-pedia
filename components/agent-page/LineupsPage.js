import { db } from '../../lib/firebase-client'
import Wrapper from '../Wrapper'
import { ChevronRightIcon, SearchIcon } from '@heroicons/react/outline'
import LineupsList from './LineupsList'
import { agentToURL } from '../../lib/agents'
import useToggle from '../../hooks/useToggle'
import LineupsFilterModal from './LineupsFilterModal'
import { useAgentPageContext } from './AgentPageLayout'
import { useEffect, useState } from 'react'
import useCollectionDataWithId from '../../hooks/useCollectionDataWithId'
import LineupsTypeAndSite from './LineupsTypeAndSite'
import Image from 'next/image'

const LineupsPage = () => {
  const { agent, maps } = useAgentPageContext()
  const [showFilterModal, toggleShowFilterModal] = useToggle()

  const AgentLineups = db
    .collection('lineups')
    .where('agent', '==', agentToURL(agent.displayName))

  const [lineupsQuery, setLineupsQuery] = useState(AgentLineups)

  // TODO : Make infinite scroll (limit = 8)
  const [lineups, lineupsLoading] = useCollectionDataWithId(lineupsQuery)

  const [lineupsType, setLineupsType] = useState('')
  const [lineupsSite, setLineupsSite] = useState('')
  const [lineupsMap, setLineupsMap] = useState('')

  function handleLineupsQuery() {
    let newQuery = AgentLineups
    if (lineupsType) {
      newQuery = newQuery.where('type', '==', lineupsType)
    }
    if (lineupsSite) {
      newQuery = newQuery.where('site', '==', lineupsSite)
    }
    if (lineupsMap) {
      newQuery = newQuery.where('map', '==', lineupsMap)
    }
    setLineupsQuery(newQuery)
  }
  useEffect(handleLineupsQuery, [lineupsType, lineupsSite, lineupsMap])

  function resetLineupsQuery() {
    setLineupsType('')
    setLineupsSite('')
    setLineupsMap('')
  }

  return (
    <Wrapper>
      <div className='mt-8 grid grid-cols-2 gap-2'>
        <LineupsList
          agentName={agent.displayName}
          lineups={lineups}
          lineupsLoading={lineupsLoading}
          resetLineupsQuery={resetLineupsQuery}
        />
      </div>
      <div className='h-20'></div>

      <nav className='fixed bottom-0 left-0 right-0 bg-white px-2 pb-2'>
        <div className='bg-white shadow-xl border rounded-lg p-1 flex'>
          {/* open filter button */}
          <button
            className='py-2 bg-[#EDEDED] rounded-sm flex-grow px-2 flex items-center'
            onClick={toggleShowFilterModal}
          >
            <div className='flex space-x-2 items-center'>
              {!lineupsType && !lineupsSite && !lineupsMap && (
                <h1 className='text-lg font-black uppercase text-gray-800'>
                  No filter applied
                </h1>
              )}
              {lineupsMap && (
                <>
                  <Image
                    src={
                      maps.find((m) => m.displayName.toLowerCase() === lineupsMap).splash
                    }
                    width={26}
                    height={26}
                    layout='fixed'
                    className='rounded-full'
                  />
                  <h1 className='text-lg font-black uppercase'>{lineupsMap}</h1>
                </>
              )}
              <LineupsTypeAndSite type={lineupsType} site={lineupsSite} black />
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
        filters={{
          lineupsType,
          lineupsSite,
          lineupsMap,
        }}
        setFilters={{
          setLineupsType,
          setLineupsSite,
          setLineupsMap,
        }}
        resetLineupsQuery={resetLineupsQuery}
      />
    </Wrapper>
  )
}

export default LineupsPage
