'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql=require('mssql');

const postUserName=async(User)=>{
    try {
        let pool =await sql.connect(config.sql);
        const sqlQueries =await utils.loadSqlQueries('events');

        const Col =await pool.request().input('Nam',sql.NVarChar(50),User).query(sqlQueries.UserName);
        
        
        return Col.recordset;
    }
    catch (error) {
        return error.message;
    }
}
const postUsersPass=async(User)=>{
    try {
        let pool =await sql.connect(config.sql);
        const sqlQueries =await utils.loadSqlQueries('events');

        const Col =await pool.request().input('Nam',sql.NVarChar(50),User).query(sqlQueries.UserPass);
        
        
        return Col.recordset;
    }
    catch (error) {
        return error.message;
    }
}
const UpdateUserID=async(login,password,Acckey,id)=>{
    try {
        let pool =await sql.connect(config.sql);
        const sqlQueries =await utils.loadSqlQueries('events');

        const Col =await pool.request().input('Login',sql.NVarChar(50),login)
        .input('Password',sql.NVarChar(150),password)
        .input('Acces',sql.Bit,Acckey)
        .input('id',sql.BigInt,id)
        .execute(sqlQueries.UpdateUserID);
        
        
        return Col.recordset;
    }
    catch (error) {
        return error.message;
    }
}
const insertUserName=async(login,password,Acckey)=>{
    try {
        let pool =await sql.connect(config.sql);
        const sqlQueries =await utils.loadSqlQueries('events');

        const Col =await pool.request().input('Login',sql.NVarChar(50),login)
        .input('Password',sql.NVarChar(150),password)
        .input('Acceskey',sql.Bit,Acckey)
        .query(sqlQueries.insertuser);
        
        
        return Col.recordset;
    }
    catch (error) {
        return error.message;
    }
}
const UpdateToken=async(token,id)=>{
    try {
        let pool =await sql.connect(config.sql);
        const sqlQueries =await utils.loadSqlQueries('events');

        const Col =await pool.request()
        .input('id',sql.BigInt,id)
        .input('token',sql.NVarChar(500),token)
        .query(sqlQueries.SaveToken);
        
        
        return Col.recordset;
    }
    catch (error) {
        return error.message;
    }}
    const UserToken=async(token)=>{
        try {
            let pool =await sql.connect(config.sql);
            const sqlQueries =await utils.loadSqlQueries('events');
    
            const Col =await pool.request()
            
            .input('token',sql.NVarChar(500),token)
            .query(sqlQueries.UserToken);
            
            
            return Col.recordset;
        }
        catch (error) {
            return error.message;
        }}
    const ClearToken=async(token)=>{
        try {
            let pool =await sql.connect(config.sql);
            const sqlQueries =await utils.loadSqlQueries('events');
    
            const Col =await pool.request()
            
            .input('token',sql.NVarChar(500),token)
            .query(sqlQueries.ClearToken);
            
            
            return Col.recordset;
        }
        catch (error) {
            return error.message;
        }}

        const PadingUser=async(PageSi,PageCou)=>{
            try {
                let pool =await sql.connect(config.sql);
                const sqlQueries =await utils.loadSqlQueries('events');
        
                const Col =await pool.request()
                
                .input('PageSize',sql.Int,PageSi)
                .input('PageCount',sql.Int,PageCou)
                .execute(sqlQueries.Pading_User);
                
                
                return Col.recordset;
            }
            catch (error) {
                return error.message;
            }}
            const PadingUserCount=async(PageSi,PageCou)=>{
                try {
                    let pool =await sql.connect(config.sql);
                  
            
                    const Col =await pool.request()
                    
                    .input('PageSize',sql.Int,PageSi)
                    .input('PageCount',sql.Int,PageCou)
                    .execute('[STK].[dbo].[Pading2_UserP1]');
                    
                    
                    return Col.recordset;
                }
                catch (error) {
                    return error.message;
                }}
                const DeleteUser=async(id)=>{
                    try {
            let pool =await sql.connect(config.sql);
            const sqlQueries =await utils.loadSqlQueries('events');
    
            const Col =await pool.request()
            
            .input('id',sql.BigInt,id)
            .query(sqlQueries.DeletUserID);
            
            
            return Col.recordset;
                    }
                    catch (error) {
                        return error.message;
                    }}
const User_ID=async(id)=>{
                        try {
                let pool =await sql.connect(config.sql);
                const sqlQueries =await utils.loadSqlQueries('events');
        
                const Col =await pool.request()
                
                .input('id',sql.BigInt,id)
                .query(sqlQueries.USER_ID);
                
                
                return Col.recordset;
                        }
                        catch (error) {
                            return error.message;
                        }}


                        const PadingPeople=async(PageSi,PageCou,enp,rs)=>{
                            try {
                                let pool =await sql.connect(config.sql);
                                
                        
                                const Col =await pool.request()
                               .input('enp',sql.VarChar(16),enp)
                                    .input('przpoiska',sql.Int,rs)
                                .input('PageSize',sql.Int,PageSi)
                                .input('PageCount',sql.Int,PageCou)
                                .execute('[STK].[dbo].[Pading_People]');
                                
                               
                                return Col.recordset;
                            }
                            catch (error) {
                                return error.message;
                            }}
                            const PadingPeopleCount=async(PageSi,PageCou,enp,rs)=>{
                                try {
                                    let pool =await sql.connect(config.sql);
                                  
                            
                                    const Col =await pool.request()
                                    .input('enp',sql.VarChar(16),enp)
                                    .input('przpoiska',sql.Int,rs)
                                    .input('PageSize',sql.Int,PageSi)
                                    .input('PageCount',sql.Int,PageCou)
                                    .execute('[STK].[dbo].[Pading_People_count]');
                                    
                                  
                                    return Col.recordset;
                                }
                                catch (error) {
                                    return error.message;
                                }}






    
module.exports={postUserName,insertUserName,postUsersPass,
    UpdateToken,ClearToken,UserToken,PadingUser,PadingUserCount,DeleteUser,User_ID,UpdateUserID,PadingPeople,PadingPeopleCount};