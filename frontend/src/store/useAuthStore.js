import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";



export const useAuthStore = create((set) => ({
    authUser: null,   //default user state is null 
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false, //just multiple global  states to hande it properly 

    isCheckingAuth: true, // loader to check if user is logged in or not 

    //checking user is loged in or not function via backend 
    checkAuth: async () => {

        try {
            const res = await axiosInstance.get("/auth/check-auth")
            console.log("resposnse check auth", res);

            set({ authUser: res.data }) // changing state to token from null if it send token in response

        } catch (error) {
            console.log("error ", error.response?.data?.message);

            set({ authUser: false }) // changing state to null if it crashes
            console.log("authUser", useAuthStore.getState().authUser);

        } finally {
            set({ isCheckingAuth: false }) //changing loader to false 
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true }) //updating loadig state to true while the data is being processed
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            toast.success(res.data.message)

            // getting the check auth state and calling the function to update and check the cookie
            await useAuthStore.getState().checkAuth()

            return true
        } catch (error) {
            toast.error(error?.response?.data?.message)
            return false

        } finally {
            set({ isSigningUp: false }) //updating loading state to false

        }


    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout")
            toast.success(res.data.message)
set({authUser : null})

        } catch (error) {
            toast.error(error.response.data.message)

        }finally{

        }

    }




}))