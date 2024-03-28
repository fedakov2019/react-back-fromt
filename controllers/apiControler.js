const eventData = require('../data/events');

const GETPadingPeople=async(req,res,next)=>{
    try{
        const {CurrentPage,PadingSize,ENP,Przpoiska}=reg.body;
      
        const dat=await userService.PadingPeople(PadingSize,CurrentPage,ENP,Przpoiska);
        
                return res.json({...dat});
     
    }
    catch(error) {
       next(error)
    }}


module.exports={GETPadingPeople}