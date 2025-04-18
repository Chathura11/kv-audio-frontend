import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider";
import {addToCart, loadCart} from '../../utils/cart';
import toast from "react-hot-toast";

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
        <div className="w-full flex justify-center items-center">
            {
                loadingState == 'loading' && <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin bg-0 w-[70px] h-[70px] "></div>
            }
            {
                loadingState =='loaded' &&
                <div className="w-full h-full flex flex-col md:flex-row justify-center items-center">
                    <h1 className="text-2xl md:hidden my-6 font-bold text-accent text-center">{product.name}</h1>
                    <div className="w-full md:w-[49%]">
                        <ImageSlider images={product.image}/>
                    </div>
                    <div className="w-full md:w-[49%] p-2 flex flex-col items-center">
                        <h1 className="hidden md:block text-3xl font-bold text-accent">{product.name}</h1>
                        <h2 className="text-xl font-semibold text-gray-800">{product.category} Category</h2>
                        <p className="text-gray-700 mt-4 text-center">{product.description}</p>
                        <p className="text-lg text-green-500 mt-4">Rs. {product.price.toFixed(2)}</p>
                        <div className="mt-4 text-sm text-gray-600">
                            <span className="font-medium">Dimensions:</span>{product.dimensions}
                        </div>
                        <button className="mt-4 bg-accent text-white px-4 py-2 rounded-md hover:bg-blue-900 cursor-pointer" onClick={()=>{
                            addToCart(product.key,1);
                            console.log(loadCart());
                            toast.success("Added to cart!")
                        }}>
                            Add to Cart
                        </button>
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