const socket = require('socket.io')
const http = require('http')

const SocketService = require('../serivice/SocketService')
const DatabaseService = require('../serivice/DatabaseService')
const { ONLINE_STATUS } = require('../constants')

module.exports = (server, app) => {
  const sessionMiddleware = (socket, next) => {
    let error = null
    try {
      // create a new (fake) Koa context to decrypt the session cookie
      const ctx = app.createContext(socket.request, new http.OutgoingMessage())
      socket.session = ctx.session
    } catch (err) {
      error = err
    }
    return next(error)
  }
  const io = socket(server)

  io.use(sessionMiddleware)
  io.on('connection', (socket) => {
    const { session: { username } } = socket
    const friendsList = DatabaseService.queryFriendsByUsername(username).friendList
    socket.on('disconnect', () => {
      if (username) {
        SocketService.sendConnectMessageToAllFriends(socket, {
          username,
          friendsList,
          status: ONLINE_STATUS.offline
        })
        // SocketService.removeSocketConnection(username)
      } else {
        console.log('someone unexpected disconnected')
      }
    })
    if (username) {
      SocketService.storeSocketConnection(username, socket.id)
      SocketService.sendConnectMessageToAllFriends(socket, {
        username,
        friendsList,
        status: ONLINE_STATUS.online
      })
    } else {
      console.log('someone unexpected connected')
    }
  })
  return io
}
