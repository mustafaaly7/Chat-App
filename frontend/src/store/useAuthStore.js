import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"



export const useAuthStore = create((set)=>({
authUser : null ,   //default user state is null 
isSigningUp: false,
isLoggingIn : false,
isUpdatingProfile : false, //just multiple global  states to hande it properly 

isCheckingAuth : true, // loader to check if user is logged in or not 

//checking user is loged in or not function via backend 
checkAuth : async()=>{

    try {
        const res = await axiosInstance.get("/auth/check-auth")
console.log("resposnse check auth" , res);

set({authUser : res.data}) // changing state to token from null if it send token in response

    } catch (error) {
        console.log("error " , error.response?.data?.message);
        
        set({authUser : false}) // changing state to null if it crashes
        console.log("authUser" ,useAuthStore.getState().authUser);
        
    }finally{
        set({isCheckingAuth : false}) //changing loader to false 
    }
},

signup : async(data) =>{
    
} 

}))