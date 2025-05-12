import Koa from 'koa'
import { bodyParserMdw, setFinalResponseMdw, setResponseTimeMdw } from './middlewares.js'
import Router from 'koa-router'
import { UserRepository } from './database/UserRepository.js'

const app = new Koa()
const router = new Router()

app.use(setFinalResponseMdw)
app.use(setResponseTimeMdw)
app.use(bodyParserMdw())

app
  .use(router.routes())
  .use(router.allowedMethods())

router.get('/user/:id', async (ctx, next) => {
  const id = ctx.params.id
  const user = await UserRepository.getUserById(id)
  ctx.body = { ok: true, user }
})

router.get('/user', async (ctx, next) => {
  const users = await UserRepository.getUsers()
  ctx.body = { ok: true, users }
})

router.post('/user', async (ctx, next) => {
  console.log(ctx.request.body)
  const { name, email, password } = ctx.request.body
  const userSaved = await UserRepository.createUser(name, email, password)
  ctx.body = { ok: true, userSaved }
})

router.put('/user/:id', async (ctx, next) => {
  const id = ctx.params.id
  const { name, email, password } = ctx.request.body
  const userUpdated = await UserRepository.updateUser({ id, name, email, password })
  ctx.body = { ok: true, userUpdated }
})

router.delete('/user/:id', async (ctx, next) => {
  const id = ctx.params.id
  const userDeleted = await UserRepository.deleteUser(id)
  ctx.body = { ok: true, userDeleted }
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
