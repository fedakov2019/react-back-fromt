'use strict';
const dotenv = require('dotenv');
const assert =require('assert');
dotenv.config();
const {PORT, HOST,HOST_URL,HOST_CL,SQL_USER,SQL_PASSWORD, SQL_DATABASE,SQL_SERVER,JWTRefreh,JWTAcces}=process.env;
const sqlEncrypt =process.env.ENCRYPT ==="true";
assert(PORT,'PORT is required');
assert(HOST, 'HOST is required');
module.exports={
    port:PORT,
    host:HOST,
    url:HOST_URL,
    url_cl:HOST_CL,
    jwtaccesSekr:JWTAcces,
    jwtrefrechSekr:JWTRefreh,
    sql:{
        server:SQL_SERVER,
        databaase:SQL_DATABASE,
        user:SQL_USER,
        password:SQL_PASSWORD,
        options :{
            encrypt:sqlEncrypt,
            enableArithAbort:true
        }
    }

}