import { createRouter } from '../../../lib/api-router'
import { getAgents } from '../../../controllers/agents'

export default function Agents(req, res) {
  const router = createRouter(req, res).on('GET', getAgents)
  router.start()
}
