import Koa from 'koa'
import { setFinalResponseMdw, setResponseTimeMdw } from './middlewares.js'
import Router from 'koa-router'
import { UserRepository } from './database/UserRepository.js'

const app = new Koa()
const router = new Router()

app.use(setFinalResponseMdw)
app.use(setResponseTimeMdw)

app
  .use(router.routes())
  .use(router.allowedMethods())

router.get('/user', async (ctx, next) => {
  const responseDB = await UserRepository.getUsers()
  ctx.body = { ok: true, message: responseDB }
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
