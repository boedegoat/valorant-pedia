import Image from 'next/image'
import Link from '../global/Link'
import { agentToURL } from '../../lib/agents'
import { HeartIcon } from '@heroicons/react/solid'

const SelectAgent = ({ src, agentName, roleName, roleIcon, agentDoc }) => {
  const tab = agentDoc?.hasLineups ? 'lineups' : 'abilities'

  return (
    <Link href={`/${agentToURL(agentName)}?tab=${tab}`}>
      <div className='relative flex-shrink-0 w-[155px] h-[240px] rounded-[10px] shadow-lg border overflow-hidden'>
        {/* agent image */}
        <Image src={src} layout='fill' objectFit='cover' />

        <div className='absolute top-1 right-1 flex flex-col space-y-1 items-end'>
          {/* agent role icon */}
          <div className='bg-gray-800 p-2 flex items-center rounded-[10px] shadow-sm'>
            <Image src={roleIcon} width={15} height={15} layout='fixed' />
          </div>

          {/* agent favorites count */}
          <div className='bg-heart flex justify-center text-xs font-bold text-white py-1 items-center rounded-[10px] shadow-sm px-2'>
            <HeartIcon className='w-4 h-4 mr-1' />
            {agentDoc?.favorites.length ?? ''}
          </div>
        </div>

        {/* bottom part */}
        <div className='absolute bottom-0 w-full h-[75px] bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)] px-2 space-y-1'>
          {/* agent role label */}
          <div className='bg-black max-w-max px-2 py-1 rounded-md'>
            <h3 className='text-white text-xs font-bold'>{roleName}</h3>
          </div>

          {/* agent name */}
          <div className='bg-white max-w-max rounded-[10px] px-2 py-1'>
            <h2 className='font-roboto font-bold text-2xl'>{agentName}</h2>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SelectAgent
