import React, { useState } from 'react'

function testing() {
  
  const [count,setCount] = useState(0); 
  const[items,setItems]=useState("Coconut");

  return (
    <div className='w-full h-screen bg-amber-200 flex flex-col justify-center items-center'>
      <h1 className='text-9xl'>{count}  {items}</h1>
      <button className='bg-black text-white text-2xl w-[200px] h-[60px] rounded-2xl' onClick={()=>{
        const newCount = count+1
        setCount(newCount)
      }}>click</button>

      <div className='flex justify-evenly w-full p-1'>
      <button className='bg-black text-white text-2xl w-[200px] h-[60px] rounded-2xl' onClick={()=>{
        setItems("Banana")
      }}>Banana</button>
      <button className='bg-black text-white text-2xl w-[200px] h-[60px] rounded-2xl' onClick={()=>{
        setItems("Coconut")
      }}>Coconut</button>
      <button className='bg-black text-white text-2xl w-[200px] h-[60px] rounded-2xl' onClick={()=>{
        setItems("Other")
      }}>Other</button>
      </div>
    </div>
  )
}

export default testing