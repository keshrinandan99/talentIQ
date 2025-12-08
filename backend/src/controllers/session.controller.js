
import { chatClient, streamClient } from "../lib/stream.js";
import {Session} from "../model/Session.js";
export async function createSession(req,res){
    try {
        const {problem,difficulty}=req.body
        const userId=req.user._id;
        const clerkId=req.user.clerkId
        if(!problem || ! difficulty){
            return resizeBy.status(401).json({message: 
                "Problem and difficulty are required fields"
            }) 
        }
        const callId=`session_${Date.now()}_${Math.random().toString(36).substring(7)}`
        const session=Session.create({
            problem,
            difficulty,
            host:userId,
            callId
        })
        //for video calls 
       await streamClient.video.call("default",callId).getOrCreate({
        data:{
            created_by_id:clerkId,
            custom: {problem,difficulty,sessionId:session._id.toString()}
        }
       })
       //for chat messaging 
       const channel=chatClient.channel("messaging", callId,{
        name:`Session ${Session.problem}`,
        created_by_id:clerkId,
        members:[clerkId]
       })
       await channel()
       return res.status(201).json({session})
        
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({message:"Internal Server error"})
        
    }
}
export async function getActiveSession(){
    try {
        const session=await Session.find({status:"active"}).populate("host","name profileImage, email , clerkId").sort({createdAt:-1}).limit(20)

        return res.status(201).json({session})
    } catch (error) {
        console.error("Error fetching active sessions", error.message)
        return res.status(401).json({
            message:"Internal server error "
        })
    }

}

export async function getSessionById(){
   try {
     const {id}=req.params
     if(!id){
         return res.status(401).json({message:"User id is required"})
     }
     const session=await Session.findById(id)
     .populate("host","name email clerkId, profileImage")
     .populate("participant", "name,email,clerkId, profileImage")

     if(!session){
        return res.status(401).json({message:`No session found with this id: ${id}`})
     }
     return res.status(201).json({session})
     
   } catch (error) {
    console.error("Error fetching session",error.message)
    return res.status(401).json({message:"Internal server error"})
   }
}
export async function getMyRecentSession(){
    try {
        const userId=req.user._id
        const sessions=await Session.find({
            status:"completed",
            $or:[{host:userId}, {participant:userId}]
        }).sort({createdAt:-1}).limit(20)
        return res.status(201).json({sessions})
    } catch (error) {
        console.error("Error fetching past sessions", error.message)
        return res.status(401).json({message:"Internal server error"})
    }


}
export async function joinSession(){
   try {
     const {id}=req.params
     const userId=req.user._id
     const clerkId=req.user.clerkId
     const session=await Session.findById(id)
     if(!session)return res.status(401).json({message:"Session not found!"})
     if(session.participant)return res.status(401).json({message:"Session is already full"})
     session.participant=userId
      await session.save()
      const channel=chatClient.channel("messaging", session.callId)
      await channel.addMembers([clerkId])
      return res.status(201).json({session})
   } catch (error) {
        console.error(error.message)
        return res.status(401).json({"Internal server error"})
   }

}
export async function endSession(){
   try {
     const {id}=req.params;
     const userId=req.user._id
     const clerkId=req.user.clerkId
     const session=await Session.findById(id)
     if(!session){
         return res.status(401).json({message:"Session not found!"})
 
     }
     if(session.host.toString() !== userId){
         return res.status(403).json({message:"Only host can end the session"})
     }
     if(session.status=="completed"){
         return res.status(401).json({message:"Session is already completed"})
     }
     session.status="completed"
     await session.save()


     //delete video stream
     const call=streamClient.video.call("default", session.callId)
     await call.delete({hard:true})

     //delete chat channel 
      const channel=chatClient.channel("messaging",session.callId)
      await channel.delete()
      
     return res.status(201).json({message:"Session ended successfully"})
   } catch (error) {
        console.error(error.message)
        return res.status(401).json({message:"Internal server error"})
   }
}
