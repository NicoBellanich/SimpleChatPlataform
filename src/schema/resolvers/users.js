import * as userController from "./../../../controllers/userController";

/*
 usuario :(obj,{idp}) => models.User.findByPk(idp)
*/

const resolvers = {
  Query: {
    usuarios: userController.findAll,
    usuario: userController.getById,
  },
  Mutation: {
    createUser: userController.CrearUsuario,
    singup: userController.SingUp
  },
};

export default resolvers;
