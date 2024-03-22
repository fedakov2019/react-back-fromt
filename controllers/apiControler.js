const eventData = require('../data/events');
const getEvent =async(req,res,next) => {
    try {
        const data=req.body;
        const event =await eventData.getEvents(data);
        res.send(event);
    }
    catch(error) {
         res.status(400).send(error.message);
}}


module.exports={getEvent}