import Link from '../Link'
import { agentToURL } from '../../lib/agents'
import { useRouter } from 'next/router'

const ChangeTab = ({ to, agentName }) => {
  const router = useRouter()

  return (
    <Link
      href={`/${agentToURL(agentName)}/${to}`}
      className={`font-roboto font-bold text-xl ${
        router.pathname === `/[agent]/${to}`
          ? 'text-gray-700 border-b-2 border-fuchsia-400'
          : 'text-gray-300'
      }`}
    >
      {to[0].toUpperCase() + to.slice(1).toLowerCase()}
    </Link>
  )
}

export default ChangeTab
