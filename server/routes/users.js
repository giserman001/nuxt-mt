const router = require('koa-router')()
const Redis = require('koa-redis')
const Person = require('../dbs/models/person')

const Store = new Redis().client

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
// 增
router.post('/addPerson', async function(ctx, next) {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  // 保存数据
  let code = 0
  try {
    await person.save()
    code = 0
  } catch (e) {
    code = -1
  }
  ctx.body = {
    code,
    msg: '成功'
  }
})
// 查
router.post('/getPerson', async function(ctx, next) {
  const result = await Person.findOne({name: ctx.request.body.name}, 'name age _id')
  const results = await Person.find({name: ctx.request.body.name}, 'name age _id')
  ctx.body = {
    code: 0,
    result,
    results
  }
})
// 改
router.post('/updatePerson', async function(ctx, next) {
  const result = await Person.where({name: ctx.request.body.name}).update({age: ctx.request.body.age})
  ctx.body = {
    code: 0,
    msg: '修改成功'
  }
})
// 删
router.post('/removePerson', async function(ctx, next) {
  const result = await Person.where({name: ctx.request.body.name}).remove()
  ctx.body = {
    code: 0,
    msg: '删除成功'
  }
})

router.get('/fix', async function(ctx) {
  const st = await Store.hset('fix', 'name', Math.random())
  ctx.body = {
    code: 0,
    msg: '成功存入redis'
  }
})
module.exports = router
