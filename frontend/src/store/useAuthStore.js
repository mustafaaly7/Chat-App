import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const devurl = import.meta.env.VITE_REACT_APP_URL
const BASE_URL = "http://localhost:5001/"

export const useAuthStore = create((set, get) => ({
    authUser: null,   //default user state is null 
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false, //just multiple global  states to hande it properly 
onlineUsers :[],
    isCheckingAuth: true, // loader to check if user is logged in or not 
    socket: null,

    //checking user is loged in or not function via backend 
    checkAuth: async () => {

        try {
            const res = await axiosInstance.get("/auth/check-auth")
            // console.log("resposnse check auth", res);

            set({ authUser: res.data }) // changing state to token from null if it send token in response
            get().connectSocket()

        } catch (error) {
            console.log("error ", error.response?.data?.message);

            set({ authUser: false }) // changing state to null if it crashes
            // console.log("authUser", useAuthStore.getState().authUser);

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
            get().connectSocket()

            return true
        } catch (error) {
            toast.error(error?.response?.data?.message)
            return false

        } finally {
            set({ isSigningUp: false }) //updating loading state to false

        }


    },

    logIn: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            // console.log("response success", res.data);

            toast.success(res.data.message)

            // getting the check auth state and calling the function to update and check the cookie before redirecting to home page 
            await useAuthStore.getState().checkAuth()

            get().connectSocket()

            return true
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            return false
        } finally {
            set({ isLoggingIn: false })

        }



    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout")
            toast.success(res.data.message)
            set({ authUser: null })
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
        }

    },

    updateProfile: async (data) => {

        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            // console.log("res" , res.data);
            toast.success("image updated succesfully")
            set({ authUser: res.data })
            await useAuthStore.getState().checkAuth()




        } catch (error) {
            toast.error(error.response.data.message)

            console.log("error", error);


        } finally {
            set({ isUpdatingProfile: false })

        }


    },
    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return
        const socket = io(import.meta.env.VITE_REACT_APP_URL,{
            query : { userId : authUser.data._id}
        })
        socket.connect()
        set({ socket: socket })

        socket.on("getOnlineUsers",(userIds) =>{ set({onlineUsers : userIds})})

    },



    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect()

    }




}))