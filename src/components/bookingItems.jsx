import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../utils/cart";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

export default function BookingItem(props) {
    const { itemKey, qty, refresh, updateQuantity } = props;
    const [item, setItem] = useState(null);
    const [status, setStatus] = useState("loading");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (status === "loading") {
            axios.get(`${backendUrl}/api/products/${itemKey}`)
                .then((res) => {
                    setItem(res.data);
                    setStatus("success");
                })
                .catch((error) => {
                    console.error(error);
                    setStatus("error");
                    removeFromCart(itemKey);
                    refresh();
                });
        }
    }, [status]);

    if (status === "loading") {
        return (
            <div className="w-full flex items-center justify-center p-4">
                <span className="text-gray-500">Loading...</span>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="w-full flex items-center justify-center p-4">
                <span className="text-red-500">Failed to load item.</span>
            </div>
        );
    }

    const totalPrice = (item.price * qty).toFixed(2);

    const handleDecrease = () => {
        if(qty == 1){
            removeFromCart(itemKey)
            refresh();
        }else{
            addToCart(itemKey, - 1);
            refresh();
        }    
    };

    const handleIncrease = () => {
        addToCart(itemKey, 1);
        refresh();
    };

    return (
        <div className="w-[1200px] flex items-center justify-between p-4 border rounded-2xl shadow-sm mb-3 bg-white hover:shadow-md transition relative">
            <div className="absolute right-[-45px] text-red-500 hover:text-white  hover:bg-red-500 cursor-pointer p-[10px] rounded-full">
                <FaTrash  onClick={()=>{
                    removeFromCart(itemKey);
                    refresh();
                }}/>
            </div>
            <div className="flex items-center space-x-4">
                {item?.image && (
                    <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-xl"
                    />
                )}
                <div>
                    <h3 className="font-semibold text-lg">{item?.name || itemKey}</h3>
                    <p className="text-sm text-gray-500 mb-1">{item?.description}</p>
                    <p className="text-sm text-gray-600">
                        Unit Price: <span className="font-semibold">{item?.price}</span>
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2 mb-1">
                    <button
                        onClick={handleDecrease}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-300 transition"
                    >
                        <FaMinus/>
                    </button>
                    <span className="font-bold">{qty}</span>
                    <button
                        onClick={handleIncrease}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-300 transition"
                    >
                        <FaPlus/>
                    </button>
                </div>
                <div>
                    <span className="text-gray-600">Total:</span>
                    <span className="ml-1 font-bold text-green-600">{totalPrice}</span>
                </div>
            </div>
        </div>
    );
}
