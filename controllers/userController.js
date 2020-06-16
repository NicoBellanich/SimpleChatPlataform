
import * as models from './../models'
import { sign } from 'jsonwebtoken'

export const findAll = () => {
  return models.User.findAll()
}

export const getById = (obj, args) => {
  return models.User.findByPk(args.id)
}

export const createUser = (obj, { firstname, lastname, username, salt, password }) => {
  return models.User.create({
    firstname,
    lastname,
    username,
    salt,
    password
  })
}

export const signUp = async (obj, { data }) => {
  const user = await SearchByUsername(data.username)

  if (user) {
    return { user: null, accessToken: null, authError: 'usuario ya creado' }
  } else {
    const newUser = await models.User.create(data)
    const { id, username } = newUser
    const accessToken = sign({ id, username }, 'secret', { expiresIn: '10d' })
    return { user: newUser, jwt: accessToken, authError: null }
  }
}

export const signIn = async (obj, { data }) => {
  const user = await SearchByUsername(data.username)

  if (user) {
    const { id, username } = user
    const accessToken = sign({ id, username }, 'secret', { expiresIn: '10d' })
    return { user: user, jwt: accessToken, authError: null }
  } else {
    return { user: null, accessToken: null, authError: 'usuario no existe' }
  }
}

const SearchByUsername = (data) => {
  return models.User.findOne({ where: { username: data } })
}
