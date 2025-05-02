import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"

export const Signup =()=>{

const[showPassword , setShowPassword] = useState(false)
const [formData , setFormData ] = useState({
    fullName :"",
    email : "" , 
    password : ""

})
const{signup ,isSigningUp } = useAuthStore()

    return(
<h1>
    Signup
</h1>

    )
}