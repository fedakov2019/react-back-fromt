'use strict';
const {check}=require("express-validator")
const express =require('express');
const auth=require('../midlvare/auth-midlvare')
const eventController =require('../controllers/eventController');
const { DeleteUser } = require("../data/events");
const router =express.Router();
const {postRegister,postLogin,GETAuth,postlogout,refrechtoken,GETPadingUser,delDeleteUser,getUserID,postUpdate_registr}=eventController;

router.get('/me',auth,GETAuth);
router.post('/register',[check('Password',"не верный пароль минимум 2 символа").isLength({min:2})],postRegister);
router.post('/login',[check('Passwords',"не верный пароль минимум 2 символа").isLength({min:2})],postLogin)
router.delete('/logout',postlogout)
router.post('/refresh',refrechtoken)
router.get('/users/page=:page/count=:count',GETPadingUser)
router.delete('/deletUser/:id',delDeleteUser)
router.get('/user/:id',getUserID)
router.post('/register/:id',postUpdate_registr)
module.exports={
    routes:router
}