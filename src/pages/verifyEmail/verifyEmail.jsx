import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail(){
    const token = localStorage.getItem('token');
    const [otp,setOtp] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      }).then((res)=>{
        console.log(res.data);
      }).catch((error)=>{
        console.log(error);
      })
    }, [])

    function handleVerifyEmail(){
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verifyEmail`,
            {
                code:parseInt(otp)
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        
        ).then((res)=>{
            console.log(res.data);
            toast.success("Email verified successfully!");
            navigate('/');

        }).catch((error)=>{
            console.log(error);
            toast.error("Invalid OTP");
        })
    }

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[400px] h-[300px] bg-white shadow-lg rounded-lg flex flex-col items-center justify-center space-y-2">
                <h1 className="text-2xl font-bold ">Verify Email</h1>
                <p className="text-gray-500">Please Verify your email</p>
                <input type="Number" placeholder="OTP" value={otp} onChange={(e)=>setOtp(e.target.value)} className="border p-2 rounde-lg w-[80%]"/>
                <button onClick={handleVerifyEmail} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-[80%] cursor-pointer">Verify</button>
            </div>
        </div>
    )
    
}