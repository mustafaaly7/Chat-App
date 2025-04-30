import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"



export const useAuthStore = create(()=>({
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


    } catch (error) {
        console.log("error " , error);
        
    }
}
}))