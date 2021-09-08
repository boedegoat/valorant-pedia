import Wrapper from './Wrapper'
import Image from 'next/image'

const AgentHeader = ({ image, children }) => {
  return (
    <header>
      <Wrapper className='relative'>
        {/* agent image */}
        <div className='relative h-[343px]'>
          <Image src={image} layout='fill' objectFit='cover' />
        </div>

        {/* agent name description */}
        <div className='relative -mt-40'>
          {/* shadow */}
          <div className='absolute inset-0 bg-gray-300 filter blur-sm rounded-lg'></div>

          {/* content */}
          <div className='relative bg-white p-4 rounded-lg'>{children}</div>
        </div>
      </Wrapper>
    </header>
  )
}

export default AgentHeader
