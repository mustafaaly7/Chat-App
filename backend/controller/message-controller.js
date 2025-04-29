import sendResponse from "../helpers/send-response.js"
import cloudinary from "../lib/cloudinary.js"
import messageModel from "../models/message-model.js"
import userModel from "../models/user-model.js"




export const getUsersforSidebar = async (req, res) => {

    try {
        //  getting the logged in user's id from token
        const loggedInUser = req.user._id

        const filteredUser = await userModel.find({ _id: { $ne: loggedInUser } }).select("-password")
        // this will get all the users except for the one that is logged in 
        //  {$ne : loggedinuser} means ignore that one and remove password field while getting the data 

        sendResponse(res, 200, false, filteredUser, "user's fetched Successfully")



    } catch (error) {
        sendResponse(res, 400, true, null, error.message)
    }


}



export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id

        const messages = await messageModel.find({
            //find all the message that has been done between those two id's sender and reciever 
            // aka user's id and the id in param of specific chat  in params both send and recieve
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId }
            ]
        })

        sendResponse(res, 200, false, messages, "messages fetched successfully ")

    } catch (error) {
        sendResponse(res, 400, true, null, error.message)

    }
}


export const sendMessage = async (req, res) => {
    try {

        const { id: recieverId } = req.params
        const senderId = req.user._id

        const { text, image } = req.body

        let imageUrl;

        if (image) {
            const uploadresponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadresponse.secure_url

        }

let newMessage = new messageModel({
    recieverId,
    senderId,
    text : text,
    image : imageUrl
})

await newMessage.save()


// todo :realtime functionality goes here  

sendResponse(res, 200 , false , newMessage , "Message send successfully")

    } catch (error) {
        sendResponse(res, 400, true, null, error.message)

    }


}