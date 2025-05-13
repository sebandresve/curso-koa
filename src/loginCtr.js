import { UserRepository } from '../database/UserRepository.js'

const signIn = async (ctx) => {
  const { email, password } = ctx.request.body

  if (!email || !password) {
    ctx.status = 400
    return
  }

  const foundUser = await UserRepository.getUserByEmail(email) // funcion que obtiene el usuario por email

  ctx.body = {
    ok: true,
    foundUser
  }
}

export const loginCtr = {
  signIn
}
