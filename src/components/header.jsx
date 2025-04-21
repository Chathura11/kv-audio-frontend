import React, { useEffect, useState } from 'react'
import { FaBars, FaCartPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import MobileNavPanel from './mobileNavPanel';
import { CiLogout,CiLogin } from "react-icons/ci";
import axios from 'axios';
import { IoSettings } from "react-icons/io5";

function header() {

  const [navPanelOpen,setNavPanelOpen] = useState(false);
  const token = localStorage.getItem('token');
  const [user,setUser] = useState(null);

  useEffect(() => {
    LoadUser();
  }, [])

  async function LoadUser(){
    await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/users/',{headers:{
        Authorization:`Bearer ${token}`
    }}).then((result)=>{
        setUser(result.data);
        console.log(result.data)
      }).catch((error)=>{
        console.log(error)
      })
  }



  return (
    <header className='w-full h-[70px] shadow-md  flex justify-center items-center relative bg-accent text-white backdrop-blur-md top-0 z-50'>
        <img src="/logo.jpg" alt="Logo" className="w-16 h-16 object-cover border-4 border-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300 absolute left-1"/>
        <div className='hidden md:flex w-[500px] justify-evenly items-center'>
          <Link to="/" className='hidden md:block text-[22px] m-1 p-2 rounded-full hover:bg-white hover:text-accent'>Home</Link>
          <Link to="/contact" className='hidden md:block text-[22px]  m-1 p-2 rounded-full hover:bg-white hover:text-accent'>Contact</Link>
          <Link to="/gallery" className='hidden md:block text-[22px]  m-1 p-2 rounded-full hover:bg-white hover:text-accent'>Gallery</Link>
          <Link to="/item" className='hidden md:block text-[22px]  m-1 p-2 rounded-full hover:bg-white hover:text-accent'>Items</Link>
          <Link to="/inquiry" className='hidden md:block text-[22px]  m-1 p-2 rounded-full hover:bg-white hover:text-accent'>Inquiries</Link>
          <Link to="/booking" className='hidden md:block text-[22px]  m-1 absolute right-25 p-2 rounded-full hover:bg-white hover:text-accent'><FaCartPlus/></Link>
        </div>
        <FaBars className='absolute right-5 text-[24px] md:hidden' onClick={()=>setNavPanelOpen(true)}/>
        {token != null ?
          <CiLogout className='hidden md:block absolute right-5 text-[30px] cursor-pointer rounded-full p-1 hover:bg-white hover:text-red-500' onClick={()=>{
            localStorage.removeItem('token')
            window.location.href = '/login'
          }}/>
          :
          <CiLogin className='hidden md:block absolute right-5 text-[30px] cursor-pointer rounded-full p-1 hover:bg-white hover:text-green-500' onClick={()=>{
            window.location.href = '/login'
          }}/>
        }
        {
          user && user.role == "admin" &&
          <IoSettings className='hidden md:block absolute right-15 text-[30px] cursor-pointer rounded-full p-1 hover:bg-white hover:text-accent' onClick={()=>{
            window.location.href = '/admin'
          }}/>
        }
        <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen}/>
    </header>
  )
}

export default header