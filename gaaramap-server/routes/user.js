const UserService = require('../serivice/UserService')

class User {
  login (ctx, next) {
    const loginInfo = ctx.request.body
    const user = UserService.login(loginInfo)
    ctx.session.username = user.username
    ctx.body = Object.assign({}, user.getInfo(), {
      status: 'success'
    })
    next()
  }

  getAllInfo (ctx, next) {
    const username = ctx.session.username
    if (!username) {
      ctx.body = {
        status: 'fail',
        message: 'no login'
      }
    } else {
      const userInfo = UserService.getAllInfoByName(username)
      ctx.body = Object.assign({}, userInfo, {
        status: 'success'
      })
    }
    next()
  }

  logout (ctx, next) {
    ctx.session = null
    ctx.body = {
      status: 'success',
      message: 'logout success'
    }
    next()
  }

  signIn (ctx, next) {
    const signInInfo = ctx.request.body
    const res = UserService.signIn(signInInfo)
    if (res) {
      ctx.body = {
        status: 'success',
        message: 'sign in success'
      }
    } else {
      ctx.body = {
        status: 'fail',
        message: 'sign in fail'
      }
    }
    next()
  }

  isNameExisted (ctx, next) {
    const username = ctx.request.query.username
    if (UserService.isNameExisted(username)) {
      ctx.body = {
        status: 'fail',
        message: 'username existed'
      }
    } else {
      ctx.body = {
        status: 'success',
        message: 'username can be use'
      }
    }
    next()
  }

  editPassword (ctx, next) {
    const { password, newPassword } = ctx.request.body
    const username = ctx.session.username
    const res = UserService.editPassword({ username, password, newPassword })
    if (res) {
      ctx.body = { status: 'success' }
    }
    next()
  }

  editUsername (ctx, next) {
    const { username: newUsername } = ctx.request.body
    const username = ctx.session.username
    const res = UserService.editUsername({ username, newUsername })
    if (res) {
      ctx.session.username = newUsername
      ctx.body = { status: 'success' }
    }
    next()
  }
}
module.exports = new User()
