import * as userController from './../../../controllers/userController'

/*
 usuario :(obj,{idp}) => models.User.findByPk(idp)
*/

const resolvers = {
  Query: {
    users: userController.findAll,
    user: userController.getById
  },
  Mutation: {
    createUser: userController.createUser,
    signUp: userController.signUp,
    signIn: userController.signIn
  }
}

export default resolvers
