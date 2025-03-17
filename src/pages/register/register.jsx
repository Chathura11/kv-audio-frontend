import { useState } from "react";
import "./register.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        address: "",
        phone: "",
    });
    
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    function handleOnChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleOnSubmit(e) {
        console.log(formData)
        e.preventDefault();
        axios.post(backendUrl + '/api/users', formData)
            .then((res) => {
                toast.success('Registration successful');
                navigate('/login');
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || 'Registration failed');
            });
    }

    return (
        <div className="bg-picture w-full h-screen flex justify-center items-center relative">
            <form onSubmit={handleOnSubmit}>
                <div className="w-[400px] h-[600px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col p-4">
                    <img className='w-[100px] h-[100px] object-cover border-[1px] rounded-full ' src="/logo.jpg"/>
                    <input name="firstname" onChange={handleOnChange} value={formData.firstname} type="text" placeholder="First Name" className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-4" required />
                    <input name="lastname" onChange={handleOnChange} value={formData.lastname} type="text" placeholder="Last Name" className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-4" required />
                    <input name="email" onChange={handleOnChange} value={formData.email} type="email" placeholder="Email" className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-4" required />
                    <input name="password" onChange={handleOnChange} value={formData.password} type="password" placeholder="Password" className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-4" required />
                    <input name="address" onChange={handleOnChange} value={formData.address} type="text" placeholder="Address" className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-4" required />
                    <input name="phone" onChange={handleOnChange} value={formData.phone} type="text" placeholder="Phone Number" className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-4" required />
                    <button className="w-[300px] h-[50px] bg-[#efac38] text-xl text-white rounded-lg my-6"> Register </button>
                </div>
            </form>
        </div>
    );
}