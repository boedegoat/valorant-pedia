import Image from 'next/image'

const AgentRole = ({ role, icon }) => {
  return (
    <button className='rounded-lg w-[90px] h-[90px] flex-shrink-0 bg-white shadow-md'>
      <Image
        src={icon}
        width={47}
        height={47}
        layout='fixed'
        className='filter invert brightness-50'
      />
      <p className='font-semibold text-gray-500 text-xs'>{role}</p>
    </button>
  )
}

export default AgentRole
