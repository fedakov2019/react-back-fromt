
const express =require('express');
const auth=require('../midlvare/auth-midlvare')
const apiController =require('../controllers/apiControler');
const router =express.Router();
const {GETPadingPeople}=apiController;
router.put('/enp',GETPadingPeople);

module.exports={
    rout:router
}