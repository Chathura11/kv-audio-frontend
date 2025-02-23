import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { LuSpeaker } from "react-icons/lu";
import { MdOutlinePreview } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

export default function AdminPage(){
    return(
        <div className='w-full h-screen flex'>
        <div className='w-[400px] h-full bg-green-200'>
          <button className='w-full h-[50px] text-[25px] font-bold bg-red-100 flex justify-center items-center'>
            <BsGraphDown/>
            Dashboard
          </button>
          <button className='w-full h-[50px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegBookmark/>
            Bookings
          </button>
          <button className='w-full h-[50px] text-[25px] font-bold flex justify-center items-center'>
            <LuSpeaker/>
            Items
          </button>
          <button className='w-full h-[50px] text-[25px] font-bold flex justify-center items-center'>
            <MdOutlinePreview/>
            Reviews
          </button>
          <button className='w-full h-[50px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegUserCircle/>
            Users
          </button>
        </div>
        <div className='w-full bg-red-900'>
          
        </div>
      </div>
    )
}