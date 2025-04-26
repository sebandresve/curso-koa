import Koa from 'koa'
import { setFinalResponseMdw, setResponseTimeMdw } from './middlewares.js'

const app = new Koa()

// piso 1 (primer middleware)
app.use(setFinalResponseMdw)

// piso 2 (segundo middleware)
app.use(setResponseTimeMdw)

// piso 3 (tercer middleware)
app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
