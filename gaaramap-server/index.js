const https = require('https')
const path = require('path')
const fs = require('fs')

const koaApp = require('./apps/koaApps')()
const httpsServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, './data/SSLKeys/server.key')),
  cert: fs.readFileSync(path.join(__dirname, './data/SSLKeys/server.crt'))
}, koaApp.callback())

const bindSocketApp = require('./apps/socketApps')

bindSocketApp(httpsServer, koaApp)

httpsServer.listen(8088, () => {
  console.log('listen on https://localhost:8088')
})
