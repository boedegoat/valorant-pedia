import { createRouter } from '../../../lib/api-router'
import { getUserById, updateUserById } from '../../../controllers/users'

export default async function users(req, res) {
  // prettier-ignore
  const router = createRouter(req, res)
    .on('GET', getUserById)
    .on('PATCH', updateUserById)

  router.start()
}
