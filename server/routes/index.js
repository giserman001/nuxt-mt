const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.cookies.set('pvid', Math.random())
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
    cookies: ctx.cookies.get('pvid'),
  }
})
router.get('/test', async (ctx, next) => {
  const a = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('a')
    }, 1000)
  })
  const b = await '2222'
  ctx.body = {
    a,
    b,
  }
})

module.exports = router
