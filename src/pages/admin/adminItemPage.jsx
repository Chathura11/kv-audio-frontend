import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

export default function AdminItemPage() {
    const [items, setItems] = useState([]);
    const [itemsLoaded,setItemsLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(!itemsLoaded){
            const token = localStorage.getItem("token");

            axios.get("http://localhost:3000/api/products", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                setItems(res.data);
                setItemsLoaded(true);
            }).catch((error) => {
                toast.error(error.response?.data?.error || "Error fetching data");
            });
        }
    }, [itemsLoaded]);

    const handleDelete = (id) => {
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:3000/api/products/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            toast.success("Item deleted successfully");
            // setItems(items.filter(item => item.key !== id));
            setItemsLoaded(false);
        }).catch((error) => {
            toast.error(error.response?.data?.error || "Error deleting item");
        });
    };

    return (
        <div className="w-full min-h-screen p-6 bg-gray-100 flex flex-col items-center">
            {!itemsLoaded && <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin bg-0 w-[100px] h-[100px] "></div>}
            {itemsLoaded&&<div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Key</th>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Price</th>
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-left">Dimensions</th>
                            <th className="px-6 py-3 text-left">Availability</th>
                            <th className="px-6 py-3 text-left">Description</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="px-6 py-4">{item.key}</td>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">${item.price}</td>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4">{item.dimensions}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-white text-sm ${item.availability ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {item.availability ? 'Available' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 truncate max-w-xs">{item.description}</td>
                                <td className="px-6 py-4 flex justify-center gap-3">
                                    <button onClick={()=>navigate('/admin/items/edit',{state:item})} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">Edit</button>
                                    <button onClick={() => handleDelete(item.key)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
            <Link to="/admin/items/add" className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition">
                <CiCirclePlus className="text-[50px]" />
            </Link>
        </div>
    );
}
