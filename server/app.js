const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const Redis = require('koa-redis')
const cors = require('koa2-cors'); //跨域处理

const mongoose = require('mongoose')
const index = require('./routes/index')
const users = require('./routes/users')
const pv = require('./middleware/koa-pv')
// 数据库配置
const dbConfig = require('./dbs/config')
// 跨域处理
app.use(
  cors({
      origin: function(ctx) { // 设置允许来自指定域名请求
          if (ctx.url === '/test') {
              return '*'; // 允许来自所有域名请求
          }
          return 'http://localhost:8000'; // 只允许http://localhost:8080这个域名的请求
      },
      maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
      credentials: true, // 是否允许发送Cookie
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法
      // allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 设置服务器支持的所有头信息字段
      // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] // 设置获取其他自定义字段
  })
);
// 错误处理
onerror(app)
app.keys = ['key', 'keys']
app.use(
  session({
    key: 'mt',
    prefix: 'mtpr',
    store: new Redis(),
  })
)

// post请求参数处理
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
app.use(pv())
app.use(json())
// 日志处理
app.use(logger())
// 静态资源处理
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// 链接db
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
