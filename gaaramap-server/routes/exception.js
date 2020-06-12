async function resolveException (ctx, next) {
  try {
    await next()
  } catch (e) {
    if (e.isCustomError) {
      ctx.body = {
        status: 'fail',
        message: e.message
      }
    } else {
      console.error('runtime error: ')
      console.log(e)
      ctx.status = 500
      ctx.body = {
        status: 'fail',
        message: 'Server Error, Pls contact Admin'
      }
    }
  }
}

module.exports = {
  resolveException
}
