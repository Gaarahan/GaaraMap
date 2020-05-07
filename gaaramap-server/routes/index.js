const Router = require('@koa/router')
const router = new Router()

const user = require('./user')
const friend = require('./friend')
const exception = require('./exception')

router.use(exception.resolveException)

router.post('/account/login', user.login)
router.get('/account/logout', user.logout)
router.post('/account/sign-in', user.signIn)

router.get('/account/get-info', user.getAllInfo)
router.get('/account/is-name-existed', user.isNameExisted)
router.post('/account/edit-password', user.editPassword)
router.post('/account/edit-username', user.editUsername)

router.post('/friend/add-friend', friend.addFriend)
router.get('/friend/approve-friend', friend.approveFriend)
router.get('/friend/reject-friend', friend.rejectFriend)

module.exports = router
