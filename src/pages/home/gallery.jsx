import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Gallery() {
  
  const [images,setImages] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    if(loading){
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`).then((res)=>{
        console.log(res.data)
        SetProductImages(res.data)
        setLoading(false)
      }).catch((error)=>{
        console.log(error);
        setLoading(false)
      })
    }
    
  },[])

  function SetProductImages(products) {
    if (!products) return;
  
    const imageList = [];
  
    products.forEach((product) => {
      if (Array.isArray(product.image)) {
        product.image.forEach((img) => {
          imageList.push(img);
        });
      }
    });
  
    setImages(imageList);
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-8 md:px-20">
      <h1 className="text-4xl font-bold text-center text-[#3674B5] mb-12">
        Our Equipment Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-white">
            <img 
              src={src} 
              alt={`Audio Equipment ${index + 1}`} 
              className="w-full h-60 object-contain"
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-12 text-gray-600">
        <p>From microphones to mixers — explore the professional gear we offer for your events!</p>
      </div>
    </div>
  );
}
