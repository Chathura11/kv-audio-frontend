import React, { useState } from 'react'
import { FaBars, FaCartPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import MobileNavPanel from './mobileNavPanel';

function header() {

  const [navPanelOpen,setNavPanelOpen] = useState(false);

  return (
    <header className='w-full h-[70px] shadow-xl flex justify-center items-center relative bg-accent text-white'>
        <img src="/logo.jpg" alt='logo' className='w-[60px] h-[60px] object-cover border-[1px] absolute left-1 rounded-full '/>
        <Link to="/" className='hidden text-[25px] font-bold m-1'>Home</Link>
        <Link to="/contact" className='hidden text-[25px] font-bold m-1'>Contact</Link>
        <Link to="/gallery" className='hidden text-[25px] font-bold m-1'>Gallery</Link>
        <Link to="/item" className='hidden text-[25px] font-bold m-1'>Items</Link>
        <Link to="/booking" className='hidden text-[25px] font-bold m-1 absolute right-3'><FaCartPlus/></Link>
        <FaBars className='absolute right-5 text-[24px]' onClick={()=>setNavPanelOpen(true)}/>
        <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen}/>
    </header>
  )
}

export default header