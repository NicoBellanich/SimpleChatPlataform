
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

export const SingUp = async (obj,{data}) =>{
   /*
    console.log(data.firstname)
    console.log(data.lastname)
    console.log(data.username)
    console.log(data.password)
    */
    const existe =  await models.User.findOne({where:{username:data.username}}) 
    if (existe){
        console.log("ya existe: ",existe.firstname, existe.username, existe.lastname)
    } 
    else{
        console.log("No existe")
        
    }
    

}