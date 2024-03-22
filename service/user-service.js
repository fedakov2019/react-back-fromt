const bcrypt=require('bcryptjs')
const eventData = require('../data/events')
const tokenservice=require('./token-service')
const ApiError=require('../exceptions/api-error')
class UserService {
async TokenSave(id,login,acces){
    let params={id,login,acces}
 const token=tokenservice.generatetoken({...params})
 await tokenservice.SaveToken(id,token.tokenrefreh)
 return {...token,user:params}
}    
async TokenSaveU(id,login,acces,resultCodes){
    let params={id,login,acces}
 const token=tokenservice.generatetoken({...params})
 await tokenservice.SaveToken(id,token.tokenrefreh)
 return {...token,user:params,resultCode:resultCodes}
}    
async UpdateRegistr(login,password,accesCey,id){
    
    
const haschPassword = await bcrypt.hash(password,12);
 const inpuser= await eventData.UpdateUserID(login,haschPassword,accesCey,id)

 const [{resultCode}]=inpuser
 
 return this.TokenSaveU(id,login,accesCey,resultCode)
 
}




async Registration(login,password,accesCey){
    
    const condidat= await eventData.postUserName(login);
    const [{Col}]=condidat;
    
    
if (Col!==0) {
    throw ApiError.BadRequest(`Такой пользователь ${login} уже существует`)
}

const haschPassword = await bcrypt.hash(password,12);
 const inpuser= await eventData.insertUserName(login,haschPassword,accesCey)
 
 const [{iduser}]=inpuser
 
 return this.TokenSave(iduser,login,accesCey)
 
}
async logout(token) {
    const col= await eventData.ClearToken(token)
    const [{resultcode}]=col
    return resultcode
}   
async refresh(token) {
if (!token)
{throw ApiError.UnauthoizedError()}
const UserData=tokenservice.validateRefrechToken(token)
const col = await eventData.UserToken(token)
let [{id,Login,Acces}]=col
if (!UserData || !id) {
    throw ApiError.UnauthoizedError()
}
return this.TokenSave(id,Login,Acces)
}


async login(log,password) {
        const coluser= await eventData.postUserName(log);
        const [{Col}]=coluser;
        
        
if (Col===0) {  throw ApiError.BadRequest('Такой пользователь не существует')}

const Users= await eventData.postUsersPass(log);
      let   [{idk,Login,Password,Acces}]=Users;

const isMatch= await bcrypt.compare(password,Password);
if (!isMatch) 
{ throw ApiError.BadRequest('Такой пользователь не существует проверте пароль')}

return this.TokenSave(idk,Login,Acces)

    }

    async PadingUSer(Size,Count) {
        const dat1=await eventData.PadingUserCount(Size,Count);
   
        const [{totalCount}]=dat1
        const items =await eventData.PadingUser(Size,Count);
    
        const newitem=items.map(u=>{
            
            const photos={smile:""};
            return {...u,photos:photos}
        }
            )
        
                 
                return {items:newitem,totalCount}


        
    }   
    async DeletUser(id){
        const dat=await eventData.DeleteUser(id);
        const [{resultCode}]=dat
        return {resultCode}  
    }
    async User_ID(id){
        const dat=await eventData.User_ID(id);
        let [{ids,Login,Password,Acces}] =dat
        
        return {id:ids,Login,Password,Acces}  
    }

}



module.exports=new UserService()