const express = require("express");
const User=require("./db");
const mainRouter=require('./routes/index')
const app=express();
const cors=require('cors')
const JWT_SECRET=require('./config')


app.use(express.json());  //body parser
app.use(cors());

//all the request in /api/v1 goes to the router
app.use('/api/v1',mainRouter)

//global catch
app.use(function(err,req,res,next){
    res.status(404).json({
        mssg:'something went wrong'
    })
})

app.listen(3000,function(){
    console.log("app is running on http://localhost:3000");
    
})