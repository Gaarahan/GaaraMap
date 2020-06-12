const socketStore = require('../models/SocketStore')
const { SOCKET_EVENTS, ONLINE_STATUS } = require('../constants')

class SocketService {
  storeSocketConnection (name, id) {
    socketStore.addConnection(name, id)
  }

  removeSocketConnection (username) {
    socketStore.removeConnection(username)
  }

  sendConnectMessageToAllFriends (socket, msg) {
    msg.friendsList.forEach(itm => {
      if (socketStore.get(itm)) {
        socket.to(socketStore.get(itm)).emit(SOCKET_EVENTS.friendConnect, msg.username, msg.status)
      }
    })
  }

  checkOnlineStatus (name) {
    return socketStore.get(name) ? ONLINE_STATUS.online : ONLINE_STATUS.offline
  }
}

module.exports = new SocketService()
