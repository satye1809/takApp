const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
var fs = require('fs');
var path = require('path');
  



dotenv.config({path:'./config.env'});


require('./db/conn');
//require('./router/auth')
app.use(express.json());
app.use(require('./router/auth'));
const PORT = process.env.PORT;


const middleware=(req,res,next)=>{
    console.log('hello about the middleware')
    next();
}
//middleware();
app.get('/feeds',(req,res)=>{
    res.cookie('jwtoken','samar')
    res.send('hello feed the server')
})
app.get('/signup',(req,res)=>{
    res.send('hello registration about the server')
})
app.listen(PORT,()=>{
    console.log('app listen')
})
