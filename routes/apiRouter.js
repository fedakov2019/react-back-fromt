
const express =require('express');
const auth=require('../midlvare/auth-midlvare')
const apiController =require('../controllers/apiControler');
const router =express.Router();
const {GETPadingPeople}=apiController;
router.get('/enp/page=:page/count=:count/enp=:enp/przpoiska=:przpoiska',GETPadingPeople);
router.get('/enp/page=:page/count=:count/przpoiska=:przpoiska',GETPadingPeople);

module.exports={
    rout:router
}