function pv(ctx) {
    ctx.session.count++
  // console.log(ctx.path + 'gogo111111111111')
}

module.exports = function () {
  return async function (ctx, next) {
    pv(ctx)
    await next()
  }
}
