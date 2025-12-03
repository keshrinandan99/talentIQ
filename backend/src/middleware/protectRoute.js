import { requireAuth } from "@clerk/express";
import { user } from "../model/User.js";

export const protectRoute=[
    requireAuth(),
    async(req,res,next)=>{
        try {
            const clerkId= req.auth().userId
            if(!clerkId)return res.status(401).json({message:"Clerk id not found!"})
            const user=await user.findone({clerkId})
            if(!user)return res.status(404).json({message:"User not found!"})
             req.user=user
            next()   

        } catch (error) {
            console.error("Clerk middleware error",error)
            return res.status(500).json({message:'Internal server errror'})
        }
    }
]