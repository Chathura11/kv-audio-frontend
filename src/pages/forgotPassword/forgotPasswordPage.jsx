import { useState } from "react"
import axios from 'axios';
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPasswordPage(){

    const [email,setEmail] = useState("");
    const navigate = useNavigate();

    function handleSendEmail(){
        if(email != ""){
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/forgotPassword/${email}`).then((res)=>{
                toast.success('Email sent successfully!');
                navigate('/change-password')
            }).catch((error)=>{
                toast.error(error.response.data.message);
            })
        }
        
    }

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[400px] bg-white shadow-2xl rounded-2xl flex flex-col items-center p-8 space-y-2">
                <h1 className="font-bold text-2xl"> Forgot Password</h1>
                <p className="text-gray-500">Please enter your email</p>
                <input  placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border p-2 rounde-lg w-[80%]"/>
                <button onClick={handleSendEmail} className="bg-blue-500 text-white p-2 rounded-lg w-[80%] hover:bg-blue-600 cursor-pointer">Submit</button>
                <Link to="/login"  className="bg-blue-500 text-white p-2 rounded-lg w-[80%] hover:bg-blue-600 cursor-pointer align-middle text-center">Back</Link>
            </div>
        </div>
    )
}