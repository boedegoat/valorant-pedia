import Image from 'next/image'

const AgentRole = ({ role, icon, roleFilter, setRoleFilter }) => {
  const active = role === roleFilter

  return (
    <button
      onClick={() => setRoleFilter(!roleFilter || roleFilter !== role ? role : '')}
      className={`
        rounded-lg w-[90px] h-[90px] flex-shrink-0 
        ${active ? 'bg-gray-600' : 'bg-white '}
        shadow-md
      `}
    >
      <Image
        src={icon}
        width={47}
        height={47}
        layout='fixed'
        className={`
          ${active ? '' : 'filter invert brightness-50'}
        `}
      />
      <p
        className={`
          font-semibold text-xs
          ${active ? 'text-white' : 'text-gray-500'}
        `}
      >
        {role}
      </p>
    </button>
  )
}

export default AgentRole
