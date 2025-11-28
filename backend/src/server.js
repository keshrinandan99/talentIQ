import express from 'express'
import { ENV } from './lib/env.js'
import path from 'path'
const app=express()
const __dirname=path.resolve()



app.get('/book',(req,res)=>{
    return res.status(201).json({message:"Server is running.... "})
    
})

if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}
app.listen(ENV.PORT,()=>{
    console.log("Server listening on port 3000");
    
})