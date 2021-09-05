export function getSearchResults(options) {
  const { agents, roleFilter, searchAgent } = options

  return agents
    .filter(({ displayName, role }) => {
      if (roleFilter) {
        return (
          displayName.toLowerCase().includes(searchAgent) &&
          role.displayName === roleFilter
        )
      }
      return displayName.toLowerCase().includes(searchAgent)
    })
    .sort(({ displayName: name1 }, { displayName: name2 }) => {
      if (name1.toLowerCase().startsWith(searchAgent)) return -1
      if (name2.toLowerCase().startsWith(searchAgent)) return 1
      return 0
    })
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
