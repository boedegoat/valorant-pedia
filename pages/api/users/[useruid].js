import { createRouter } from '../../../lib/api-router'
import { getUserByUid, updateUserByUid } from '../../../controllers/users'

export default async function users(req, res) {
  // prettier-ignore
  const router = createRouter(req, res)
    .on('GET', getUserByUid)
    .on('PATCH', updateUserByUid)

  router.start()
}
