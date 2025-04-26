import Koa from 'koa'
import { setFinalResponseMdw, setResponseTimeMdw } from './middlewares.js'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

app.use(setFinalResponseMdw)
app.use(setResponseTimeMdw)

app
  .use(router.routes())
  .use(router.allowedMethods())

router.get('/user', (ctx, next) => {
  ctx.body = { ok: true, message: 'Hola GET' }
})

router.post('/user', (ctx, next) => {
  ctx.body = { ok: true, message: 'Hola POST' }
})

router.put('/user', (ctx, next) => {
  ctx.body = { ok: true, message: 'Hola PUT' }
})

router.delete('/user', (ctx, next) => {
  ctx.body = { ok: true, message: 'Hola DELETE' }
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
