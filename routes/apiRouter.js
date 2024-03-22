
const express =require('express');
const auth=require('../midlvare/auth-midlvare')
const apiController =require('../controllers/apiControler');
const router =express.Router();
const {getEvent}=apiController;
router.put('/enp',auth,getEvent);

module.exports={
    rout:router
}