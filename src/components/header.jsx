import React from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function header() {
  return (
    <header className='w-full h-[100px] shadow-xl flex justify-center items-center relative bg-accent text-white'>
        <img src="logo.jpg" alt='logo' className='w-[100px] h-[100px] object-cover border-[1px] absolute left-1 rounded-full '/>
        <Link to="/" className='text-[25px] font-bold m-1'>Home</Link>
        <Link to="/contact" className='text-[25px] font-bold m-1'>Contact</Link>
        <Link to="/gallery" className='text-[25px] font-bold m-1'>Gallery</Link>
        <Link to="/item" className='text-[25px] font-bold m-1'>Items</Link>
        <Link to="/booking" className='text-[25px] font-bold m-1 absolute right-3'><FaCartPlus/></Link>
    </header>
  )
}

export default header