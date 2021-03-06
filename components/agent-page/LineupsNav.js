import useToggle from 'hooks/useToggle'
import { useSession } from 'next-auth/client'
import { ChevronRightIcon, SearchIcon } from '@heroicons/react/outline'
import LineupsFilterModal from './LineupsFilterModal'
import LineupsTypeAndSite from './LineupsTypeAndSite'
import Image from 'next/image'
import Modal from 'components/global/Modal'
import SearchBar from 'components/global/SearchBar'
import SelectLineup from './SelectLineup'
import { useEffect, useState } from 'react'
import { parseCollectionWithId, search } from 'lib/utils'

export default function LineupsNav({ maps, filter, AgentLineups }) {
  const [showFilterModal, toggleShowFilterModal] = useToggle()
  const [showSearch, toggleShowSearch] = useToggle()
  const [session] = useSession()

  // handle search lineups
  const [searchLineupsInput, setSearchLineupsInput] = useState('')
  const [searchLineupsResults, setSearchLineupsResults] = useState([])
  useEffect(() => {
    if (!searchLineupsInput) return
    const results = search(searchLineupsInput, {
      data: parseCollectionWithId(lineups),
      field: 'title',
    })
    setSearchLineupsResults(results)
  }, [searchLineupsInput])

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white px-2 pb-2'>
      <div className='bg-white shadow-xl border rounded-lg p-1 flex'>
        {/* open filter button */}
        <button
          className='py-2 bg-[#EDEDED] rounded-sm flex-grow px-2 flex items-center'
          onClick={toggleShowFilterModal}
        >
          <div className='flex space-x-2 items-center'>
            {!filter.type && !filter.site && !filter.map && (
              <h1 className='text-lg font-black uppercase text-gray-800'>No filter applied</h1>
            )}
            {filter.map && (
              <>
                <Image
                  src={maps.find(m => m.displayName.toLowerCase() === filter.map).splash}
                  alt={maps.find(m => m.displayName.toLowerCase() === filter.map).displayName}
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
        <Modal title='Search' open={showSearch} onClose={toggleShowSearch} includeCloseButton>
          <SearchBar
            placeholder='Search lineups'
            value={searchLineupsInput}
            onChange={e => setSearchLineupsInput(e.target.value)}
          />
          {searchLineupsInput && (
            <>
              {searchLineupsResults.length ? (
                <div className='mt-8 grid grid-cols-2 gap-2'>
                  {searchLineupsResults.map(lineup => (
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
                  ???? <b>{searchLineupsInput}</b> not found
                </div>
              )}
            </>
          )}
        </Modal>
      </div>
    </nav>
  )
}
