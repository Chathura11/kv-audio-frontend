import { useState } from "react"
import "./login.css"
import axios from 'axios';

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function handleOnSubmit(e){
        e.preventDefault(); 
        axios.post('http://localhost:3000/api/users/login',{
            email:email,
            password:password
        }).then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.log(error)
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