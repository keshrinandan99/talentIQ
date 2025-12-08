import express from 'express'
import { ENV } from './lib/env.js'
import path from 'path'
import cors from 'cors'
import {dbConnect} from './lib/dbInstance.js'
import {serve} from 'inngest/express'
import { functions, inngest } from './lib/inngest.js'
import { clerkMiddleware } from '@clerk/express'
import { protectRoute } from './middleware/protectRoute.js'
import chatRoute from './routes/chatRoute.js'
import sessionRoute from './routes/sessionRoute.js'
const app=express()
const __dirname=path.resolve()

app.use(express.json())
app.use(cors({
    origin:ENV.CLIENT_URL,
    credentials:true
}))
app.use('/api/inngest', serve({
      client: inngest,
      functions,
    }))

  app.use(clerkMiddleware());

app.get('/book',protectRoute,(req,res)=>{
    return res.status(201).json({message:"Server is running.... "})
    
})
app.use('api/chat',chatRoute)
app.use('api/session', sessionRoute);



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
        console.log("Error starting application",error);
        
    }
}
startServer()