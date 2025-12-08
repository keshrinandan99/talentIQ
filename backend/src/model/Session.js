import mongoose, { mongo } from "mongoose";
const sessionSchema=mongoose.Schema({
    problem:{
        type:String,
        require:true
    },
    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        require:true
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    participant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    status:{
        type:String,
        enum:["active", "inactive"],
        default:"active"
    },
    callId:{
        type:String,
        default:""
    }

},{timestamps:true})

export const Session=mongoose.model("session",sessionSchema);