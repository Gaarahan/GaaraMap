const CustomError = require('../utils/CustomError')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

class DatabaseService {
  constructor () {
    try {
      const database = fs.readFileSync('../data/database.json', 'utf-8')
      this._database = JSON.parse(database)
    } catch (e) {
      this._database = {
        users: {},
        friends: {}
      }
    }
  }

  queryUserByUsername (name) {
    return _.cloneDeep(this.database.users[name]) || null
  }

  queryFriendsByUsername (name) {
    return _.cloneDeep(this.database.friends[name]) || null
  }

  isNameExist (name) {
    return Object.keys(this.database.users).includes(name)
  }

  writeDatabase () {
    try {
      fs.writeFileSync(path.join(__dirname, '../data/database.json'), JSON.stringify(this.database))
      return true
    } catch (e) {
      throw new CustomError('写入数据库失败')
    }
  }

  appendUser (user) {
    const userData = Object.assign({}, user.getRegisterInfo(), {
      id: Object.keys(this.database.users).length + 1
    })
    Object.assign(this.database.users, {
      [userData.username]: userData
    })
    Object.assign(this.database.friends, {
      [userData.username]: {
        friendList: [],
        friendReq: []
      }
    })
    return this.writeDatabase()
  }

  editUserInfo (newUser) {
    const userData = newUser.getRegisterInfo()
    Object.assign(this.database.users, {
      [newUser.username]: userData
    })
    return this.writeDatabase()
  }

  changeUsername ({ username, newUsername }) {
    // move user info
    const userData = this.queryUserByUsername(username)
    userData.username = newUsername
    Reflect.deleteProperty(this.database.users, username)

    Object.assign(this.database.users, {
      [newUsername]: userData
    })
    // move friends info
    const friendsData = this.queryFriendsByUsername(username)
    Reflect.deleteProperty(this.database.friends, username)

    Object.assign(this.database.friends, {
      [newUsername]: friendsData
    })

    return this.writeDatabase()
  }

  updateFriendsData (data) {
    this.database.friends = Object.assign(this.database.friends, data)
    return this.writeDatabase()
  }

  get database () {
    return this._database
  }

  set database (value) {
    this._database = value
  }
}

module.exports = new DatabaseService()
