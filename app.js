'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const choke =require('cookie-parser')
const bodyParser =require('body-parser');
const app=express();
const eventRoutes=require('./routes/eventRoutes')
const apiRoutes=require('./routes/apiRouter')
const errorMidlvare=require('./midlvare/error-midlvare')
const ConfCors=
    {
        origin: config.url_cl,
        credentials: true
        
      }

app.use(cors(ConfCors));
app.use(choke())




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/auth',eventRoutes.routes)
app.use('/api',apiRoutes.rout)
app.use(errorMidlvare);
const start=async()=>{
  try {
app.listen(config.port,()=>console.log(`sercer is listenin port ${config.port}`))
  }
  catch(e)
  {
    console.log(e)
  }
}
start()