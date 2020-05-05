const Router = require('@koa/router')
const router = new Router()

const user = require('./user')
const exception = require('./exception')

router.use(exception.resolveException)

router.post('/account/login', user.login)
router.get('/account/logout', user.logout)
router.post('/account/sign-in', user.signIn)

router.get('/account/get-info', user.getAllInfo)
router.get('/account/is-name-existed', user.isNameExisted)

module.exports = router
