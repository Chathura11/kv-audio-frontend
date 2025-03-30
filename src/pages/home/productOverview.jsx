import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider";

export default function ProductOverView(){

    const params = useParams();
    const key = params.key;
    const [loadingState,setLoadingStatus] = useState('loading');
    const [product,setProduct] = useState({});

    const backendUrl = import.meta.env.VITE_BACKEND_URL; 

    useEffect(() => {
      axios.get(backendUrl+'/api/products/'+key).then((result)=>{
        setProduct(result.data);
        setLoadingStatus('loaded')
        console.log(result)
      }).catch((error)=>{
        console.log(error)
        setLoadingStatus('error')
      })
    }, [])
    

    return(
        <div className="w-full h-full  flex justify-center items-center">
            {
                loadingState == 'loading' && <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin bg-0 w-[70px] h-[70px] "></div>
            }
            {
                loadingState =='loaded' &&
                <div className="w-full h-full flex justify-center">
                    <div className="w-[49%] h-full ">
                        <ImageSlider images={product.image}/>
                    </div>
                    <div className="w-[49%] h-full flex flex-col items-center">
                        <h1 className="text-3xl font-bold text-accent">{product.name}</h1>
                        <h2 className="text-xl font-semibold text-gray-800">{product.category}</h2>
                        <p className="text-gray-700 mt-4">{product.description}</p>
                        <p className="text-lg font-bold text-green-500 mt-4">{product.price}</p>
                        <div className="mt-4 text-sm text-gray-600">
                            <span className="font-medium">Dimensions:</span>{product.dimensions}
                        </div>
                    </div>
                </div>
            }
            {
                loadingState =='error' &&
                <div className="flex justify-center items-center">
                    <h1 className="text-3xl font-bold text-accent">Error Occured</h1>
                </div>
            }
        </div>
    )
}