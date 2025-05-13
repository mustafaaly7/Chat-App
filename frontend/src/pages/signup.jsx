import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Loader, Mail } from 'lucide-react';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { Link, useNavigate } from "react-router";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import toast from 'react-hot-toast';



export const Signup = () => {

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: ""

    })
    const { signup, isSigningUp } = useAuthStore()

    // just for validation of form 
    const validateForm = () => {
        if (!formData.fullname.trim()) return toast.error('full name is Required!')
        if (!formData.email.trim()) return toast.error('email is Required!')
        if (!formData.password.trim()) return toast.error('password is Required!')
        if (formData.password.length < 6) return toast.error('password must be atleast 6 characters')
        return true

    };


// handling signup api with zustand  in authstore
    const handleSubmit = async(e) => {
        e.preventDefault()

        
        const isValid = validateForm()
        if (!isValid ) return 


        const success = await signup(formData)

if(success){

        
        navigate("/")
}



    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="w-full max-w-6xl bg-base-100 shadow-xl rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

                {/* Left Side (Form) */}
                <div className="flex flex-col justify-center p-8 sm:p-12">
                    <div className="w-full max-w-md mx-auto space-y-6">
                        <div className="text-center">
                            <div className="flex flex-col items-center group gap-2 mb-4">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Mail className="text-primary size-6" />
                                </div>
                                <h1 className="text-2xl font-bold mt-2">Create An Account</h1>
                                <p className="text-base-content/60">Get started with your free account</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name */}
                            <label className="floating-label">
                                <span>Full Name</span>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="input input-md w-full"
                                    value={formData.fullname}
                                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                    required
                                />
                            </label>

                            {/* Email */}
                            <label className="input validator w-full">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </g>
                                </svg>
                                <input
                                    type="email"
                                    placeholder="johndoe@gmail.com"
                                    className="w-full"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </label>

                            {/* Password */}
                            <label className="input validator w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-lock-icon lucide-lock"
                                >
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Your Password"
                                    className="w-full"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </label>

                            {/* Submit Button */}
                            <div className="text-center pt-2">
                                <button className="btn btn-primary w-full" type="submit" disabled={isSigningUp}>
                                    {isSigningUp ? (
                                        <>
                                            <Loader className="size-5 animate-spin mr-2" />
                                            Loading
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>
                            </div>

                            {/* Link to login */}
                            <p className="text-center text-zinc-400">
                                Already have an account?{" "}
                                <Link to="/login" className="text-primary font-semibold hover:underline">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Right Side Lottie Animation for big screens */}
                <div className="hidden lg:flex items-center justify-center bg-primary/10 relative overflow-hidden">
                    <DotLottieReact
                        src="https://lottie.host/b7821f86-51d5-4006-8265-264dbaf1483b/ujVa0tZl8l.lottie"
                        loop
                        autoplay
                    />
                </div>



            </div>
        </div>


    )
}