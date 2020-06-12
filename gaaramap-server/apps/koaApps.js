const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const session = require('koa-session')

const router = require('../routes')

module.exports = () => {
  const app = new Koa()

  app.keys = ['gaarahan']

  app
    .use(cors({
      credentials: true
    }))
    .use(session(app))
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

  return app
}
