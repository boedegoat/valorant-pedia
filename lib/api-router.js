export default class Router {
  constructor(req, res) {
    this.req = req
    this.res = res

    this.get = null
    this.post = null
    this.patch = null
    this.delete = null
  }

  on(method, callback) {
    switch (method) {
      case 'GET':
        this.get = callback
        break
      case 'POST':
        this.post = callback
        break
      case 'PATCH':
        this.patch = callback
        break
      case 'DELETE':
        this.delete = callback
        break
    }
    return this
  }

  start() {
    const giveBack = [this.req, this.res]
    switch (this.req.method) {
      case 'GET':
        this.get(...giveBack)
        break
      case 'POST':
        this.post(...giveBack)
        break
      case 'PATCH':
        this.patch(...giveBack)
        break
      case 'DELETE':
        this.delete(...giveBack)
        break
    }
  }
}

export function createRouter(req, res) {
  return new Router(req, res)
}
