const FriendService = require('../serivice/FriendService')
class Friend {
  addFriend (ctx, next) {
    const { name: friendName } = ctx.request.body
    const username = ctx.session.username
    const res = FriendService.addFriend({ username, friendName })
    if (res) {
      ctx.body = { status: 'success', message: 'add friend success' }
    }
    next()
  }

  approveFriend (ctx, next) {
    const friendName = ctx.request.query.name
    const username = ctx.session.username
    const res = FriendService.approveFriend({ username, friendName })
    if (res) {
      ctx.body = { status: 'success', message: 'approve friend success' }
    }
    next()
  }

  rejectFriend (ctx, next) {
    const friendName = ctx.request.query.name
    const username = ctx.session.username
    const res = FriendService.rejectFriend({ username, friendName })
    if (res) {
      ctx.body = { status: 'success', message: 'reject friend success' }
    }
    next()
  }
}
module.exports = new Friend()
