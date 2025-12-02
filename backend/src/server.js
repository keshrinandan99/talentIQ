import express from 'express'
import { ENV } from './lib/env.js'
import path from 'path'
import cors from 'cors'
import {dbConnect} from './lib/dbInstance.js'
import {serve} from 'inngest/express'
import { functions, inngest } from './lib/inngest.js'

const app=express()
const __dirname=path.resolve()

app.use(express.json())
app.use(cors({
    origin:ENV.CLIENT_URL,
    credentials:true
}))
app.use("api/inngest", serve({
      client: inngest,
      functions,
    }))

app.get('/book',(req,res)=>{
    return res.status(201).json({message:"Server is running.... "})
    
})

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer=async()=>{
try {
    await dbConnect()
     app.listen(ENV.PORT,()=>{
    console.log("Server listening on port 3000");
       
})       
    } catch (error) {
        
    }
}
startServer()