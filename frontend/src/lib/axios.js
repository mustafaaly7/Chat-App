import axios from "axios"


export const axiosInstance = axios.create({
    baseURL : "http://localhost:5001/api", // backend url  baseurl not deployed yet and created axios instance
    withCredentials : true // sending cookies in every req 
})