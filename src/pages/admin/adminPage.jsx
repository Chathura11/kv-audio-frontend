import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { LuSpeaker } from "react-icons/lu";
import { MdOutlinePreview } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className='w-full h-screen flex'>
        <div className='w-[400px] h-full bg-green-200'>
          <button className='w-full h-[50px] text-[25px] font-bold bg-red-100 flex justify-center items-center'>
            <BsGraphDown/>
            Dashboard
          </button>
          <Link to="/admin/bookings" className='w-full h-[50px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegBookmark/>
            Bookings
          </Link>
          <Link to="/admin/items" className='w-full h-[50px] text-[25px] font-bold flex justify-center items-center'>
            <LuSpeaker/>
            Items
          </Link>
          <button className='w-full h-[50px] text-[25px] font-bold flex justify-center items-center'>
            <MdOutlinePreview/>
            Reviews
          </button>
          <button className='w-full h-[50px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegUserCircle/>
            Users
          </button>
        </div>
        <div className='w-[calc(100vw-400px)] bg-red-900'>
          <Routes path="/*">
            <Route path="/bookings" element={<h1>Booking</h1>}/>
            <Route path="/items" element={<h1>Items</h1>}/>
          </Routes>
        </div>
      </div>
    )
}