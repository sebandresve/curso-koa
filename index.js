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

router.get('/user', async (ctx, next) => {
  const responseDB = await UserRepository.getUsers()
  ctx.body = { ok: true, message: responseDB }
})

router.post('/user', async (ctx, next) => {
  console.log(ctx.request.body)
  const { name, email, password } = ctx.request.body
  const userSaved = await UserRepository.createUser(name, email, password)
  ctx.body = { ok: true, userSaved }
})

router.put('/user', (ctx, next) => {
  ctx.body = { ok: true, message: 'Hola PUT' }
})

router.delete('/user', (ctx, next) => {
  ctx.body = { ok: true, message: 'Hola DELETE' }
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
