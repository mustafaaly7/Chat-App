import { ref, string } from "joi";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    senderId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    recieverId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text:{
        type:string
    },
    image:{
        type:string
    }
 
},{
    timestamps : true
});

const messageModel =  mongoose.model("Message", messageSchema);

export default messageModel