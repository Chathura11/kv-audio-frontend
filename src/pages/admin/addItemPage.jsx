import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddItemPage(){

    const [productKey,setProductKey] = useState("");
    const [productName,setProductName] = useState("");
    const [productPrice,setProductPrice] = useState(0);
    const [productCategory,setProductCategory] = useState("");
    const [productDimensions,setProductDimensions] = useState("");
    const [productDescription,setProductDescription] = useState("");

    const navigate = useNavigate();

    async function handleAddItem(e){
        e.preventDefault();
        const token = localStorage.getItem("token");

        if(token){
           try {
                const result = await axios.post("http://localhost:3000/api/products",{
                key :productKey,
                name:productName,
                price:productPrice,
                category:productCategory,
                dimensions:productDimensions,
                description:productDescription
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
    
    return(
        <div className="w-full h-full flex flex-col items-center p-2">
            Add Item
            <div className="w-[400px] p-2 flex flex-col shadow-2xl">
                <input type="text" className="h-[30px] m-2" onChange={(e)=>setProductKey(e.target.value)} placeholder="Product Key"/>
                <input type="text"  className="h-[30px] m-2" onChange={(e)=>setProductName(e.target.value)} placeholder="Product Name"/>
                <input type="number"  className="h-[30px] m-2" onChange={(e)=>setProductPrice(e.target.value)} placeholder="Product Price"/>
                <select className="h-[30px] m-2" value={productCategory}  onChange={(e)=>setProductCategory(e.target.value)}>
                    <option defaultChecked key={"audio"}>Audio</option>
                    <option key={"light"}>Light</option>
                </select>
                <input className="h-[30px] m-2" type="text"  onChange={(e)=>setProductDimensions(e.target.value)} placeholder="Product Dimensions"/>
                <input className="h-[30px] m-2" type="text"  onChange={(e)=>setProductDescription(e.target.value)} placeholder="Product Description"/>
                <button onClick={handleAddItem} className="w-full mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add</button>
                <button onClick={()=>navigate("/admin/items")} className="w-full mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
            </div>
        </div>
    )
}