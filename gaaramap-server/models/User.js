const md5 = require('md5')

class User {
  constructor ({ id, username, password, email, registerTime, headPic }) {
    this._username = username
    this._password = password
    this._email = email
    this._registerTime = registerTime
    this._id = id
    this._headPic = headPic
  }

  getInfo () {
    return {
      username: this.username,
      email: this.email,
      registerTime: this.registerTime,
      headPic: this.headPic
    }
  }

  getRegisterInfo () {
    return {
      username: this.username,
      email: this.email,
      registerTime: new Date().getTime(),
      password: md5(this.password)
    }
  }

  get id () {
    return this._id
  }

  get registerTime () {
    return this._registerTime
  }

  get username () {
    return this._username
  }

  get password () {
    return this._password
  }

  get email () {
    return this._email
  }

  set password (value) {
    this._password = value
  }

  get headPic () {
    return this._headPic
  }

  set registerTime (value) {
    this._registerTime = value
  }
}

module.exports = User
