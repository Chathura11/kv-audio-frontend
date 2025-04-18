import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images;
    const [selectedImage,setSelectedImage] = useState(images[0])

    return(
        <div className="w-full flex flex-col items-center">
            <img src={selectedImage} alt="product" className="w-full h-[300px] object-contain" />
            <div className="w-full h-[90px] mt-[20px] flex justify-center items-center">
                {images.map((image,index)=>{
                    return(
                        <img key={index} src={image} alt="product" className={`w-[70px]  mr-[2px] h-[70px] object-contain  cursor-pointer ${image == selectedImage && "border border-accent"}`} onClick={()=>{setSelectedImage(image)}}/>
                    )
                })}
            </div>
        </div>
    )
}