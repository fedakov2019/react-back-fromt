const eventData = require('../data/events');
const userService = require('../service/user-service');

const GETPadingPeople=async(reg,res,next)=>{
    try{
        const CurrentPage=reg.params['page'];

        const PadingSize=reg.params['count'];
        const ENP1=reg.params['enp'];
        
        const ENP=(typeof(ENP1) != "undefined")?ENP1:''
      

       const Przpoiska=reg.params['przpoiska'];
        const dat1=await eventData.PadingPeopleCount(PadingSize,CurrentPage,ENP,Przpoiska);
   
        const [{totalCount}]=dat1
        const peoples =await eventData.PadingPeople(PadingSize,CurrentPage,ENP,Przpoiska);
    
        
                 
                return res.json({peoples,totalCount})

        
        
               
     
    }
    catch(error) {
       next(error)
    }}


module.exports={GETPadingPeople}