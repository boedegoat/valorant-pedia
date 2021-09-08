import { useRouter } from 'next/router'

const ChangeTabButton = ({ value, children, onClick }) => {
  const router = useRouter()

  return (
    <button
      className={`
      font-roboto font-bold text-2xl border-b-2 
      ${
        value === router.query.tab
          ? 'text-gray-700 border-fuchsia-400'
          : 'text-gray-300 border-transparent'
      }
    `}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  )
}

export default ChangeTabButton
