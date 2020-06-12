const DatabaseService = require('./DatabaseService')
const CustomError = require('../utils/CustomError')
const { FRIEND_STATUS } = require('../constants')

class FriendService {
  addFriend ({ username, friendName }) {
    const friendListObj = this.queryFriendsListObjByUsernameList([username, friendName])

    if (!friendListObj[friendName]) {
      throw new CustomError('该用户名称不存在')
    }

    friendListObj[friendName].friendReq.push({
      name: username,
      status: FRIEND_STATUS.pending
    })

    friendListObj[username].friendReq.push({
      name: friendName,
      status: FRIEND_STATUS.waitingForApprove
    })

    return DatabaseService.updateFriendsData(friendListObj)
  }

  approveFriend ({ username, friendName }) {
    const friendListObj = this.queryFriendsListObjByUsernameList([username, friendName])

    if (!friendListObj[friendName]) {
      throw new CustomError('该用户名称不存在')
    }

    friendListObj[friendName].friendList.push(username)
    friendListObj[friendName].friendReq.find(itm => itm.name === username).status = FRIEND_STATUS.approved

    friendListObj[username].friendList.push(friendName)
    friendListObj[username].friendReq.find(itm => itm.name === friendName).status = FRIEND_STATUS.approved

    return DatabaseService.updateFriendsData(friendListObj)
  }

  rejectFriend ({ username, friendName }) {
    const friendListObj = this.queryFriendsListObjByUsernameList([username, friendName])

    if (!friendListObj[friendName]) {
      throw new CustomError('该用户名称不存在')
    }

    friendListObj[friendName].friendReq.find(itm => itm.name === username).status = FRIEND_STATUS.rejected

    friendListObj[username].friendReq.find(itm => itm.name === friendName).status = FRIEND_STATUS.rejected

    return DatabaseService.updateFriendsData(friendListObj)
  }

  queryFriendsListObjByUsernameList (nameList) {
    const res = {}
    for (const name of nameList) {
      const friends = DatabaseService.queryFriendsByUsername(name)
      if (friends) {
        Object.assign(res, {
          [name]: friends
        })
      }
    }
    return res
  }
}

module.exports = new FriendService()
