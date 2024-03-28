'use strict'
const config = require('../config');
const jwt=require('jsonwebtoken');
const { validationResult } = require('express-validator');
const userService = require('../service/user-service');
const bcrypt = require('bcryptjs');


const postRegister=async(reg,res,next)=>{
    try{
        const errors = validationResult(reg)
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(),message:"Некорректный пароль"})
        }
        const {Name,Password,AccesCey}=reg.body;
        const UserData=await userService.Registration(Name,Password,AccesCey)
       res.cookie('refrechtoken',UserData.tokenrefreh,{maxAge:30*24*60*60*1000,httpOnly:true})
       return res.json({...UserData})
    }
    catch(e) {
        next(e)
        
    }}

    const postUpdate_registr=async(reg,res,next)=>{
        try{
            const errors = validationResult(reg)
            if (!errors.isEmpty()){
                return res.status(400).json({errors: errors.array(),message:"Некорректный пароль"})
            }
            const {id,Name,Password,AccesCey}=reg.body;
            const UserData=await userService.UpdateRegistr(Name,Password,AccesCey,id)
           res.cookie('refrechtoken',UserData.tokenrefreh,{maxAge:30*24*60*60*1000,httpOnly:true,SameSait:Lax})
          
           return res.json({...UserData})
        }
        catch(e) {
            next(e)
            
        }   

}
const GETAuth=async(req,res,next)=>{
try{
    
    const {id,login,acces}=req.user.paiload

    if (! id) { return res.status(401).json({message:'нет авторизации', resultCode:'10'})}
    res.json({resultCode:0,UserData:{id,login,acces}})
}
catch(error) {
    res.status(500).json({message:"Что то пошло не так, поробуйте позже", resultCode:'1'})
}
}
const postlogout=async(reg,res,next)=>{
    try{
        const {refrechtoken}=reg.cookies;
        const resultCode = await userService.logout(refrechtoken)
        res.clearCookie('refrechtoken')
        return res.json({resultCode:0})
    }
    catch(e) {
        next(e)
    }
}
const postLogin=async(reg,res,next)=>{
    try{
        const errors = validationResult(reg)
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(),message:"Некорректный пароль"})
        }
        const {Name,Passwords}=reg.body;
        const UserData=await userService.login(Name,Passwords)
        res.cookie('refrechtoken',UserData.tokenrefreh,{maxAge:30*24*60*60*1000,httpOnly:true})
        return res.json({UserData, resultCode:0})
  
        

    }
    catch(e) {
        next(e)
    }}
const refrechtoken=async(reg,res,next)=>{
    try{
        const {refrechtoken}=reg.cookies;
        
        const userdata = await userService.refresh(refrechtoken)
        
        res.cookie('refrechtoken',userdata.tokenrefreh,{maxAge:30*24*60*60*1000,httpOnly:true})
        return res.json({userdata})
    }
    catch(e) {
        next(e)
    }
}
const GETPadingUser=async(req,res,next)=>{
    try{
        
        const PadingCount=req.params['page'];

        const PadingSice=req.params['count'];
        const dat=await userService.PadingUSer(PadingSice,PadingCount);
        
                return res.json({...dat});
     
    }
    catch(error) {
       next(error)
    }}

   

    const delDeleteUser=async(req,res,next)=>{
        try{
            
            const User_id=req.params['id'];
    
            
            
            const dat1=await userService.DeletUser(User_id);
            
            const {resultCode}=dat1;
            
          
                    return res.json({...dat1});
         
        }
        catch(error) {
           next(error)
        }}
const getUserID=async(req,res,next)=>{
    try{
        
        const id=req.params['id'];

        
        const dat=await userService.User_ID(id);
        
                return res.json(dat);
     
    }
    catch(error) {
       next(error)
    }}

module.exports={postRegister,postLogin,GETAuth,postlogout,refrechtoken,GETPadingUser,delDeleteUser,getUserID,postUpdate_registr}