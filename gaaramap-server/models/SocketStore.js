class SocketStore {
  constructor () {
    this.store = {
      connections: {}
    }
  }

  addConnection (username, id) {
    this.store.connections[username] = id
  }

  removeConnection (username) {
    Reflect.deleteProperty(this.store, username)
  }

  get (username) {
    return this.store.connections[username]
  }
}

module.exports = new SocketStore()
