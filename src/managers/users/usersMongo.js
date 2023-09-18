import {usersModel} from '../../db/models/users.model.js';

class UsersMongo{

    async createUser(user){
        const filterAdmin = "adminCoder@coder.com"
        try {
          if(filterAdmin === user.email){
          user.isAdmin = true  
          const newUser = await usersModel.create(user)
          }else{
          const newUser = await usersModel.create(user)
          }
          return newUser  
        } catch (error) {
            return error
        }
    }

    async findUser(username){
        try {
          const user = await usersModel.findOne({username})
          return user  
        } catch (error) {
            return error
        }
    }

    
}


export const userMongo = new UsersMongo();