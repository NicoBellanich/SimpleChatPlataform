
import * as models from "./../models"

export const findAll = () =>{
    return models.User.findAll()
}

export const getById = (obj,args) =>{
    return models.User.findByPk(args.id)
}

export const CrearUsuario = (obj,{ firstname, lastname, username, salt, password })=> {
    return models.User.create({
      firstname,
      lastname,
      username,
      salt,
      password,
    })
}