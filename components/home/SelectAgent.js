import Image from 'next/image'
import Link from '../Link'
import { agentToURL } from '../../lib/agents'

const defaultTab = 'lineups'

const SelectAgent = ({ src, agentName, roleName, roleIcon }) => {
  return (
    <Link href={`/${agentToURL(agentName)}/${defaultTab}`}>
      <div className='relative flex-shrink-0 w-[155px] h-[240px] rounded-[10px] shadow-lg border overflow-hidden'>
        {/* agent image */}
        <Image src={src} layout='fill' objectFit='cover' />

        {/* agent role icon */}
        <div className='absolute top-1 right-1 bg-gray-500 p-2 flex items-center rounded-[10px]'>
          <Image src={roleIcon} width={15} height={15} layout='fixed' />
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
