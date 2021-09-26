export function getSearchResults(options) {
  const { agents, roleFilter, searchAgent } = options

  return agents
    .filter(({ displayName, role }) => {
      const matchAgentName = displayName.toLowerCase().includes(searchAgent.toLowerCase())

      if (roleFilter) {
        return matchAgentName && role.displayName === roleFilter
      }
      return matchAgentName
    })
    .sort(({ displayName: name1 }, { displayName: name2 }) => {
      if (name1.toLowerCase().startsWith(searchAgent)) return -1
      if (name2.toLowerCase().startsWith(searchAgent)) return 1
      return 0
    })
}

export function agentToURL(name) {
  return name.toLowerCase().replace(/\//g, '-')
}

export function parseAgentFromURL(url) {
  return url.replace(/-/g, '/')
}

export async function getAgents() {
  const fetchAgents = await fetch('https://valorant-api.com/v1/agents')
  return (await fetchAgents.json()).data
    .filter(({ role }) => role)
    .sort(({ displayName: a }, { displayName: b }) => {
      if (a > b) return 1
      if (a < b) return -1
      return 0
    })
}

export async function getAgentsByName(agentName) {
  const agents = await getAgents()
  return agents.find(
    ({ displayName }) => displayName.toLowerCase() === agentName.toLowerCase()
  )
}

export function getRoles(agents) {
  function findRole(role) {
    return agents.find(({ role: agentRole }) => agentRole.displayName === role).role
  }

  return [
    {
      name: 'Duelist',
      description: findRole('Duelist').description,
      icon: findRole('Duelist').displayIcon,
    },
    {
      name: 'Controller',
      description: findRole('Controller').description,
      icon: findRole('Controller').displayIcon,
    },
    {
      name: 'Sentinel',
      description: findRole('Sentinel').description,
      icon: findRole('Sentinel').displayIcon,
    },
    {
      name: 'Initiator',
      description: findRole('Initiator').description,
      icon: findRole('Initiator').displayIcon,
    },
  ]
}
