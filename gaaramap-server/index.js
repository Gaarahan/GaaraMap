const https = require('https')
const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const router = require('./routes')
const session = require('koa-session')

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

https.createServer({
  key: fs.readFileSync(path.join(__dirname, './data/SSLKeys/server.key')),
  cert: fs.readFileSync(path.join(__dirname, './data/SSLKeys/server.crt'))
}, app.callback())
  .listen(8088, () => {
    console.log('listen on https://localhost:8088')
  })
