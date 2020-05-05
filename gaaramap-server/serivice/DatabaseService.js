const database = require('../data/database')
const CustomError = require('../utils/CustomError')
const fs = require('fs')
const path = require('path')

class DatabaseService {
  constructor (database) {
    this._database = database || {
      users: {}
    }
  }

  queryUserByUsername (name) {
    return this.database.users[name] || null
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
    return this.writeDatabase()
  }

  get database () {
    return this._database
  }

  set database (value) {
    this._database = value
  }
}

module.exports = new DatabaseService(database)
