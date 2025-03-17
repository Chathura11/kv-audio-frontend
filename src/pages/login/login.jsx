import { useState } from "react"
import "./login.css"
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL; 

    function handleOnSubmit(e){
        e.preventDefault(); 
        axios.post(backendUrl+'/api/users/login',{
            email:email,
            password:password
        }).then((res)=>{
            console.log(res)
            toast.success('Login success')
            const user = res.data.user;

            localStorage.setItem("token",res.data.token)

            if(user.role =="admin"){
                navigate('/admin/')
            }else{
                navigate('/')
            }
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    }

    return(
        <div className="bg-picture w-full h-screen flex justify-center items-center relative">
            <form onSubmit={handleOnSubmit}>
            <div className="w-[400px] h-[400px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col">
                <img className='w-[100px] h-[100px] object-cover border-[1px] rounded-full ' src="/logo.jpg"/>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Email" className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-6"></input>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-6"></input>
                <button className="w-[300px] h-[50px] bg-[#efac38] text-xl text-white rounded-lg my-8"> login</button>
            </div>
            </form>
        </div>
    )
}