import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";


export const useChatstore = create((set,get)=>({
messages :[],  // messages state
users:[],// all the users state
selectedUser : null , // for specific chat id i.e with id  

isUsersLoading : false, // for loading skeletons on frontend while the number of user's load 

isMessagesLoading:  false, // for loading skeletons on frontend while the messages load 

getUsers :async()=>{
try {
    set({isUsersLoading  : true})

const res = await axiosInstance.get("/message/users")
set({users: res.data.data})


} catch (error) {
    toast.error(error.response?.data?.message)
    console.log(error);
    


}finally{


    set({isUsersLoading  :false })

}


},

getMessages :async(userId)=>{
    set({isMessagesLoading: true})
    
    try {
const res = await axiosInstance.get(`/message/${userId}`)
set({messages : res.data.data})

        
    } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
    }finally{
    set({isMessagesLoading: false})


    }
},

subscribeToMessages : ()=>{
const {selectedUser}= get()
if(!selectedUser) return
const socket = useAuthStore.getState().socket


//optimize later
socket.on("newMessage" , (newMessage) =>{
    set({

        messages : [...get().messages , newMessage],
    })
})

},

unsubscribeFromMessages:()=>{
const socket = useAuthStore.getState().socket
socket.off("newMessage")
},

//todo : optimize that later
setSelectedUser : (selectedUser) => set({selectedUser}),

sendMessage : async(messageData) =>{
const {messages , selectedUser} = get()  

try {
    const res =  await axiosInstance.post(`/message/send/${selectedUser._id}` , messageData)
    set({messages : [...messages , res.data.data]})



} catch (error) {
    toast.error(error.response.data.message)
    console.log(error.response.data.message)

}


}


}))

