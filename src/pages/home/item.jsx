import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ProductCard from '../../components/productCard';

export default function Item() {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [items,setItems] = useState([])
  const [state,setState] = useState("loading");//loading,success,error


  useEffect(()=>{
    if(state == "loading"){
      axios.get(`${backendUrl}/api/products`).then((res)=>{
        setItems(res.data);
        console.log(res.data)
        setState("success")
      }).catch((error)=>{
        toast.error(error?.response?.data?.message || 'Items loading failed');
        setState("error")
      })
    }
    
  },[])

  return (
    <div className='w-full h-full flex flex-wrap pt-[50px] justify-center'>
      {state =="loading" &&
        <div className="flex justify-center items-center mt-20">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      }
      {
        state =="success" &&
        items.map((item)=>{
          return(
            <ProductCard key={item.key} item={item}/>
          )
        })
      }
    </div>
  )
}
