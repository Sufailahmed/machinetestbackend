//1)imoprt dotenv

require("dotenv").config()

//import express
const express=require("express")
require('./db')

// //import router
const router=require('./Routes/userRoute')
// const router=require('./routes/router')


//import cors
const cors=require('cors')

//4)create server
const spServer=express();

//use cores
spServer.use(cors())
//use middleware  to convert json to object
spServer.use(express.json())
spServer.use(router)

//define port
const PORT=5000;

//8 run the server
spServer.listen(PORT,()=>{
    console.log("Server is up and running in port:",PORT);
})

spServer.get('/',(req,res)=>{
    res.send(" server is running successfully")
})