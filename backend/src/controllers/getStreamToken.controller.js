import {chatClient} from '../lib/stream.js'

async function getStreamToken(req,res){
    try {
        const token = chatClient.create(req.user)
        return res.status(200).json({
            token,
            userName:req.user.name,
            userId:req.user.clerkId,
            userImage:req.user.image

        })
    } catch (error) {
        console.error("Error in getStreamToken",error);
        return res.status(500).json({message:
            "Internal server error"
        })
    }
}
export default getStreamToken;