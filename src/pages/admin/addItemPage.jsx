import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from'../../utils/mediaUpload';

export default function AddItemPage({edit}){

    const navigate = useNavigate();
    const location = useLocation();

    const [productKey,setProductKey] = useState(edit?location.state.key:"");
    const [productName,setProductName] = useState(edit?location.state.name:"");
    const [productPrice,setProductPrice] = useState(edit?location.state.price:0);
    const [productCategory,setProductCategory] = useState(edit?location.state.category:"");
    const [productDimensions,setProductDimensions] = useState(edit?location.state.dimensions:"");
    const [productDescription,setProductDescription] = useState(edit?location.state.description:"");
    const [productImages,setProductImages] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL; 

    

    async function handleAddItem(e){
        e.preventDefault();

        const promises =[]
        for(let i=0;i<productImages.length ; i++){
            const promise = mediaUpload(productImages[i])
            promises.push(promise);
        }

        // Promise.all(promises).then((result)=>{
        //     console.log(result)
        // }).catch((error)=>{
        //     console.log(error)
        // })

        const token = localStorage.getItem("token");

        if(token){
            try {

                const imageUrls = await Promise.all(promises);

                const result = await axios.post(backendUrl+"/api/products",{
                key :productKey,
                name:productName,
                price:productPrice,
                category:productCategory,
                dimensions:productDimensions,
                description:productDescription,
                image:imageUrls
                },{
                    headers:{
                        Authorization:"Bearer "+token
                    }
                })
                toast.success(result.data.message);
                navigate("/admin/items")

           } catch (error) {
            toast.error(error.response.data.message);
           }
           
        }else{
            toast.error("Please login first!");
        }
    } 

    async function handleUpdate(e){
        e.preventDefault();
        const token = localStorage.getItem("token");

        if(token){
            try {

                let updadingImages = location.state.image;

                if(productImages.length > 0){
                    const promises =[]
                    for(let i=0;i<productImages.length ; i++){
                        const promise = mediaUpload(productImages[i])
                        promises.push(promise);
                    }
                    updadingImages = await Promise.all(promises);
                }                            

                const result = await axios.put(backendUrl+'/api/products/'+productKey,{
                    key :productKey,
                    name:productName,
                    price:productPrice,
                    category:productCategory,
                    dimensions:productDimensions,
                    description:productDescription,
                    image:updadingImages
                },{
                    headers:{
                        Authorization:"Bearer "+token
                    }
                    
                })
                toast.success(result.data.message);
                navigate("/admin/items")
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }
    
    return(
        <div className="w-full h-full flex flex-col items-center p-2">
            {edit ?"Update Item":"Add Item"}
            <div className="w-[400px] p-2 flex flex-col shadow-2xl">
                <input type="text" disabled={edit?true:false} value={productKey} className="h-[30px] m-2" onChange={(e)=>setProductKey(e.target.value)} placeholder="Product Key"/>
                <input type="text" value={productName}  className="h-[30px] m-2" onChange={(e)=>setProductName(e.target.value)} placeholder="Product Name"/>
                <input type="number" value={productPrice}  className="h-[30px] m-2" onChange={(e)=>setProductPrice(e.target.value)} placeholder="Product Price"/>
                <select className="h-[30px] m-2" value={productCategory}  onChange={(e)=>setProductCategory(e.target.value)}>
                    <option key={"audio"}>Audio</option>
                    <option key={"light"}>Light</option>
                </select>
                <input value={productDimensions} className="h-[30px] m-2" type="text"  onChange={(e)=>setProductDimensions(e.target.value)} placeholder="Product Dimensions"/>
                <textarea value={productDescription} className="h-[30px] m-2" type="text"  onChange={(e)=>setProductDescription(e.target.value)} placeholder="Product Description"/>
                <input multiple type="file" onChange={(e)=>setProductImages(e.target.files)} className="w-full p-2 border rounded"  />
                <button onClick={edit?handleUpdate:handleAddItem} className="w-full mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">{edit?"Update":"Add"}</button>
                <button onClick={()=>navigate("/admin/items")} className="w-full mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
            </div>
        </div>
    )
}