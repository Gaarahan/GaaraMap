const md5 = require('md5')
const Schema = require('validate')

const DatabaseService = require('./DatabaseService')
const User = require('../models/User')
const CustomError = require('../utils/CustomError')

class UserService {
  login (loginInfo) {
    const { username, password } = loginInfo
    if (!username || !password) {
      throw new CustomError('用户名或密码不能为空')
    }

    const result = DatabaseService.queryUserByUsername(username)
    if (!result) {
      throw new CustomError('用户名不存在')
    }
    if (result.password !== md5(password)) {
      throw new CustomError('密码错误，请重试')
    }

    return new User(result)
  }

  getInfoByName (name) {
    const result = DatabaseService.queryUserByUsername(name)
    if (!result) {
      throw new CustomError('找不到对应用户,请检查username')
    }

    return new User(result)
  }

  signIn (info) {
    const signInValidateSchema = new Schema({
      username: {
        required: true,
        type: String,
        match: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
      },
      password: {
        required: true,
        type: String
      },
      email: {
        required: true,
        type: String,
        match: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      }
    })
    const validateErrors = signInValidateSchema.validate(info)
    if (validateErrors.length) {
      throw new CustomError('注册字段不匹配，请按前端要求来')
    }
    if (this.isNameExisted(info.username)) {
      throw new CustomError('该昵称已被占用')
    }
    const user = new User(info)
    return DatabaseService.appendUser(user)
  }

  isNameExisted (name) {
    return DatabaseService.isNameExist(name)
  }
}

module.exports = new UserService()
