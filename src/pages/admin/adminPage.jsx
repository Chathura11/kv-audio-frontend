import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { LuSpeaker } from "react-icons/lu";
import { MdOutlinePreview } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemPage from "./adminItemPage";
import AddItemPage from "./addItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage(){

  const [userValidated,setUserValidated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(!token){
      window.location.href = '/login';
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`,{headers:{
      Authorization:`Bearer ${token}`
    }}).then((res)=>{
      const user = res.data;

      if(user.role =="admin"){
        setUserValidated(true);
      }else{       
        window.location.href = '/';
      }
      
    }).catch((error)=>{
      console.log(error);
      setUserValidated(false);
    })
  }, [])
  

    return(
        <div className='w-full h-screen flex'>
        <div className='w-[400px] h-full bg-green-200'>
          <button className='w-full h-[50px] text-[25px] font-bold bg-red-100 flex justify-center items-center'>
            <BsGraphDown/>
            Dashboard
          </button>
          <Link to="/admin/orders" className='w-full h-[50px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegBookmark/>
            Orders
          </Link>
          <Link to="/admin/items" className='w-full h-[50px] text-[25px] font-bold flex justify-center items-center'>
            <LuSpeaker/>
            Items
          </Link>
          <Link to="/admin/reviews" className='w-full h-[50px] text-[25px] font-bold flex justify-center items-center'>
            <MdOutlinePreview/>
            Reviews
          </Link>
          <Link to="/admin/users" className='w-full h-[50px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegUserCircle/>
            Users
          </Link>
        </div>
        <div className='w-[calc(100vw-200px)]'>
          {userValidated && 
            <Routes path="/*">
              <Route path="/orders" element={<AdminOrdersPage/>}/>
              <Route path="/users" element={<AdminUsersPage/>}/>
              <Route path="/items" element={<AdminItemPage/>}/>
              <Route path="/items/add" element={<AddItemPage/>}/>
              <Route path="/items/edit" element={<AddItemPage edit={true}/>}/>
              <Route path="/reviews" element={<h1>Reviews</h1>}/>
              <Route path="/users" element={<h1>Users</h1>}/>
            </Routes>
          }
        </div>
      </div>
    )
}