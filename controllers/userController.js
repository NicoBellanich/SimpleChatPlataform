export const findAll = (parent, args, context, info) => {
  if (!context.user)  throw new Error('ups, seems you are not logged in') 
  
  return context.models.User.findAll()
}

export const getById = (obj, args, context, info) => {
  return context.models.User.findByPk(args.id)
}

export const createUser = (obj, args, context) => {
  const { firstname, lastname, username, salt, password } = args
  return context.models.User.create({
    firstname,
    lastname,
    username,
    salt,
    password
  })
}

export const signUp = async (obj, { data }, context) => {
  const user = await context.models.User.findByUsername({ username: data.username })
  if (user) return { user: null, accessToken: null, authError: 'User already exist' }

  const newUser = await context.models.User.create(data)
  const accessToken = await newUser.getAccessToken()

  return {
    user: newUser,
    jwt: accessToken,
    authError: null
  }
}

export const signIn = async (obj, { data }, context) => {
  const user = await context.models.User.findByUsername({ username: data.username })
  if (!user) { return { user: null, accessToken: null, authError: 'User does not exist' } }
  if (!user.passwordMatches(data.password)) { return { user: null, accessToken: null, authError: 'Wrong password' } }

  const accessToken = user.getAccessToken()

  return {
    user: user,
    jwt: accessToken,
    authError: null
  }
}

export const currentUser = (parent, args, context, info) => {
  return context.user
}
