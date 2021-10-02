import { createRouter } from '../../../lib/api-router'
import { getAgentByName } from '../../../controllers/agents'

export default function AgentName(req, res) {
  const router = createRouter(req, res).on('GET', getAgentByName)
  router.start()
}
