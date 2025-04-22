import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart.jsx";
import BookingItem from "../../components/bookingItems.jsx";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage() {
    const [cart, setCart] = useState(loadCart());

    const today = new Date();
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const [startDate, setStartDate] = useState(formatDate(today));
    const [endDate, setEndDate] = useState(formatDate(tomorrow));

    const [total,setTotal] = useState(0); 

    function ReloadCart() {
        setCart(loadCart());
        calTotal();
    }

    function calTotal(){
        const cartInfo = loadCart();
        cartInfo.startingDate = startDate;
        cartInfo.endingDate = endDate;
        cartInfo.days = totalDays;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`,cartInfo).then((res)=>{
            setTotal(res.data.total);
            console.log(res.data.total);
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(() => {
      calTotal();
    }, [startDate,endDate])
    

    function handleBookingCreation(){
        const cart = loadCart();
        cart.startingDate = startDate;
        cart.endingDate = endDate;
        cart.days = totalDays;

        if(cart.orderedItems.length > 0){
            const token = localStorage.getItem("token");
            const backendUrl = import.meta.env.VITE_BACKEND_URL; 

            axios.post(backendUrl+"/api/orders",cart,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }).then((res)=>{
                console.log(res.data);
                localStorage.removeItem("cart");
                setCart(loadCart());
                toast.success("Booking Created!");
            }).catch((error)=>{
                console.log(error)
                toast.error("Failed to create booking!");
            })
        }else{
            toast.error("Your cart is empty.");
        }

        
    }

    function calculateDays(start, end) {
        const startD = new Date(start);
        const endD = new Date(end);
        const diffTime = endD - startD;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    }

    const totalDays = calculateDays(startDate, endDate);

    return (
        <div className="w-full h-full flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-6">Create Booking</h1>

            <div className="w-full max-w-lg mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                    <input
                        type="date"
                        className="w-full border rounded-lg p-2"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">End Date</label>
                    <input
                        type="date"
                        className="w-full border rounded-lg p-2"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <div className="text-gray-800 font-semibold">
                    Total Days: <span className="text-green-600">{totalDays}</span>
                </div>
            </div>

            <div className="w-full flex flex-col items-center">
                {cart.orderedItems.length > 0 ? (
                    cart.orderedItems.map((item) => (
                        <BookingItem
                            key={item.key}
                            itemKey={item.key}
                            qty={item.qty}
                            refresh={ReloadCart}
                        />
                    ))
                ) : (
                    <div className="text-gray-500">Your cart is empty.</div>
                )}
            </div>

            <div className="text-gray-800 font-semibold">
                    Total: <span className="text-green-600">{total.toFixed(2)}</span>
            </div>

            <div className="w-full flex justify-center mt-6">
                <button className="bg-accent text-white px-4 py-2 rounded-md cursor-pointer" onClick={handleBookingCreation}>
                    Create Booking
                </button>
            </div>
        </div>
    );
}
