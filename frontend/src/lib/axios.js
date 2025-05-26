import axios from "axios"

const devurl = import.meta.env.VITE_REACT_APP_URL

export const axiosInstance = axios.create({
    baseURL :devurl, // backend url  baseurl not deployed yet and created axios instance
    withCredentials : true // sending cookies in every req 
})