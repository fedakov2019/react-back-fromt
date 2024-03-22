const config = require('../config');
const jwt=require('jsonwebtoken');
const eventData = require('../data/events')


class TokenService {
    generatetoken(paiload)
    {
        const tokenrefreh=jwt.sign(
            {paiload},
            config.jwtrefrechSekr, {expiresIn: '30d'}
        
        )
        const tokenaccess=jwt.sign(
            {paiload},
            config.jwtaccesSekr, {expiresIn: '2h'})
        
        const token={tokenrefreh,tokenaccess}
      return token
    }
    async SaveToken(id,token) {
        const condidat= await eventData.UpdateToken(token,id);
        return condidat
    }
 validateAccesToken(token)
 {
    try{
        const userData =jwt.verify(token,config.jwtaccesSekr)
        return userData
    }
    catch(e){
return null
    }
 }
 validateRefrechToken(token)
 {
    try{
        const userData =jwt.verify(token,config.jwtrefrechSekr)
        return userData
    }
    catch(e){
return null
    }
 }
}
module.exports=new TokenService()