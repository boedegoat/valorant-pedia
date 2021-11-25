import { db } from 'lib/firebase-client'
import Wrapper from 'components/global/Wrapper'
import { ChevronRightIcon, SearchIcon } from '@heroicons/react/outline'
import LineupsList from './LineupsList'
import { agentToURL } from 'lib/agents'
import useToggle from 'hooks/useToggle'
import LineupsFilterModal from './LineupsFilterModal'
import { useAgentPageContext } from './AgentPageLayout'
import LineupsTypeAndSite from './LineupsTypeAndSite'
import Image from 'next/image'
import { useAppContext } from 'context/appContext'
import useCollectionDataWithId from 'hooks/useCollectionDataWithId'
import { useEffect, useState } from 'react'
import Modal from 'components/global/Modal'
import SearchBar from 'components/global/SearchBar'
import { search } from 'lib/utils'
import { useSession } from 'next-auth/client'
import SelectLineup from './SelectLineup'

const LineupsPage = () => {
  const [
    {
      lineupsState: { filter },
    },
    dispatch,
  ] = useAppContext()
  const [session] = useSession()
  const { agent, maps } = useAgentPageContext()
  const [showFilterModal, toggleShowFilterModal] = useToggle()
  const [showSearch, toggleShowSearch] = useToggle()

  const AgentLineups = db
    .collection('lineups')
    .where('agent', '==', agentToURL(agent.displayName))

  // to update query each user open this page
  useEffect(() => {
    dispatch({
      type: 'UPDATE_FILTER_LINEUPS_QUERY',
      pay: { query: AgentLineups },
    })
  }, [])

  const [lineups, lineupsLoading] = useCollectionDataWithId(filter.query ?? AgentLineups)

  // handle search lineups
  const [searchLineupsInput, setSearchLineupsInput] = useState('')
  const [searchLineupsResults, setSearchLineupsResults] = useState([])
  useEffect(() => {
    if (!searchLineupsInput) return
    const results = search(searchLineupsInput, {
      data: lineups,
      field: 'title',
    })
    setSearchLineupsResults(results)
  }, [searchLineupsInput])

  return (
    <Wrapper>
      <div className='mt-8 grid grid-cols-2 gap-2'>
        <LineupsList lineups={lineups} lineupsLoading={lineupsLoading} />
      </div>
      {/* <div className='mt-4 text-center font-bold' ref={loadMoreLineupsRef}>
        {endLineups ? '✨ out of lineups' : 'loading'}
      </div> */}

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
          <LineupsFilterModal
            show={showFilterModal}
            onClose={toggleShowFilterModal}
            maps={maps}
            AgentLineups={AgentLineups}
          />

          {/* search button */}
          <button className='px-5' onClick={toggleShowSearch}>
            <SearchIcon className='w-[32px] h-[32px] text-gray-800' />
          </button>
          {/* search modal */}
          <Modal
            title='Search'
            open={showSearch}
            onClose={toggleShowSearch}
            includeCloseButton
          >
            <SearchBar
              placeholder='Search lineups'
              value={searchLineupsInput}
              onChange={(e) => setSearchLineupsInput(e.target.value)}
            />
            {searchLineupsInput && (
              <>
                {searchLineupsResults.length ? (
                  <div className='mt-8 grid grid-cols-2 gap-2'>
                    {searchLineupsResults.map((lineup) => (
                      <SelectLineup
                        lineup={lineup}
                        maps={maps}
                        user={session?.user}
                        key={lineup.id}
                        back={`${lineup.agent}?tab=lineups`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className='text-center'>
                    🙈 <b>{searchLineupsInput}</b> not found
                  </div>
                )}
              </>
            )}
          </Modal>
        </div>
      </nav>
    </Wrapper>
  )
}

export default LineupsPage
