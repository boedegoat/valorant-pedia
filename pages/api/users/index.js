import { createRouter } from '../../../lib/api-router'
import { getUsers, postUser } from '../../../controllers/users'

export default async function users(req, res) {
  // prettier-ignore
  const router = createRouter(req, res)
    .on('GET', getUsers)
    .on('POST', postUser)

  router.start()
}
