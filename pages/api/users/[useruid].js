import { createRouter } from '../../../lib/api-router'
import { getUserByUid } from '../../../controllers/users'

export default async function users(req, res) {
  const router = createRouter(req, res).on('GET', getUserByUid)
  router.start()
}
