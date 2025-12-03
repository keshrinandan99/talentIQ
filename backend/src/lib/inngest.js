import { Inngest } from "inngest";
import { dbConnect } from "./dbInstance.js";
import { user } from "../model/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";
export const inngest = new Inngest({ id: "talent-iq" });

const syncUser=inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},

    async({event})=>{
        await dbConnect();
        const {first_name,last_name,id,email_addresses,image_url}=event.data;
        const newUser={
            clerkId:id,
            email: email_addresses[0]?.email_address,
            profileImage:image_url,
            name:`${first_name || " "} ${last_name || " "}`
        }
        await user.create(newUser);
         await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });

    }
)

const deleteUser=inngest.createFunction(
    {id:"delete-from-db"},
    {event:"clerk/user.deleted"},

    async({event})=>{
        await dbConnect()
        const {id}=event.data
        await user.deleteOne({clerkId:id});
        await deleteStreamUser(id.toString())
    }
)
export const functions=[syncUser,deleteUser]