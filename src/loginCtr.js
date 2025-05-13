import { UserRepository } from '../database/UserRepository.js'
import { comparePassword } from './utils/hashPassword.js'
import { createToken } from './utils/tokenGenerator.js'

const signIn = async (ctx) => {
  const { email, password } = ctx.request.body

  if (!email || !password) {
    ctx.status = 400
    return
  }

  const foundUser = await UserRepository.getUserByEmail(email) // funcion que obtiene el usuario por email

  const passwordMatch = await comparePassword(password, foundUser.password) // funcion que compara la contraseña

  if (!passwordMatch) {
    ctx.status = 401
    return
  }

  const jwt = createToken({ id: foundUser.id, email: foundUser.email }) // funcion que crea el token

  const data = {
    id: foundUser.id,
    email: foundUser.email
  }

  ctx.body = {
    ok: true,
    data,
    jwt
  }
}

export const loginCtr = {
  signIn
}
