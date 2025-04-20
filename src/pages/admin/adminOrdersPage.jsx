import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeOrder,setActiveOrder] = useState(null);
    const [modalOpened,setModalOpened] = useState(false);

    useEffect(() => {
        if (loading) {
            const token = localStorage.getItem('token');

            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data);
                setOrders(res.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            });
        }
    }, [loading]);

    function handleOrderStatusChange(orderId,status){
        const token = localStorage.getItem('token');
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
            {
                status:status
            },
            {
                headers:{
                            Authorization:`Bearer ${token}`
                        }
            }
        ).then((res)=>{
            console.log(res.data);
            setModalOpened(false);
            setLoading(true);
            
        }).catch((error)=>{
            console.log(error);
            setModalOpened(false);
            setLoading(true);
            
        })
    }

    return (
        <div className="w-full p-4">
            <h1 className="text-3xl font-bold mb-8">Admin Orders Page</h1>
            {loading ? (
                <div className="flex justify-center items-center mt-20">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 uppercase text-xs font-semibold">
                            <tr>
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Order Date</th>
                                <th className="p-3">Days</th>
                                <th className="p-3">Start</th>
                                <th className="p-3">End</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr
                                    key={order._id}
                                    className="hover:bg-gray-50 cursor-pointer transition " 
                                    onClick={() => {
                                        setActiveOrder(order);
                                        setModalOpened(true);
                                    }}
                                >
                                    <td className="p-3">{order.orderId}</td>
                                    <td className="p-3">{order.email}</td>
                                    <td className="p-3">{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td className="p-3">{order.days}</td>
                                    <td className="p-3">{new Date(order.startingDate).toLocaleDateString()}</td>
                                    <td className="p-3">{new Date(order.endingDate).toLocaleDateString()}</td>
                                    <td className="p-3">Rs. {order.totalAmount.toFixed(2)}</td>
                                    <td className="p-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            order.status === "Approved"
                                                ? "bg-green-100 text-green-700"
                                                : order.status === "Rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {
                modalOpened &&
                (
                    <div className="fixed top-0 left-0 w-full h-full bg-[#00000090] flex justify-center items-center">
                        <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg relative">
                            <IoMdCloseCircleOutline className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-600" onClick={()=>{
                                setModalOpened(false);
                            }}/>
                            <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
                            <div className="flex flex-col gap-2">
                                <p><span className="font-semibold">Order ID : </span>{activeOrder.orderId}</p>
                                <p><span className="font-semibold">Email : </span>{activeOrder.email}</p>
                                <p><span className="font-semibold">Days : </span>{activeOrder.days}</p>
                                <p><span className="font-semibold">Starting Date : </span>{new Date(activeOrder.startingDate).toLocaleDateString()}</p>
                                <p><span className="font-semibold">End Date : </span>{new Date(activeOrder.endingDate).toLocaleDateString()}</p>
                                <p><span className="font-semibold">Total Amount : </span>{activeOrder.totalAmount.toFixed(2)}</p>
                                <p><span className="font-semibold">Approval Status : </span>{activeOrder.status}</p>
                                <p><span className="font-semibold">Order Date : </span>{new Date(activeOrder.orderDate).toLocaleDateString()}</p>
                            </div>
                            <div className="my-5 w-full flex items-center">
                                <button className="bg-green-500 text-white px-4 py-1 rounded-md cursor-pointer" onClick={()=>{
                                    handleOrderStatusChange(activeOrder.orderId,"Approved")
                                }}>
                                    Approve
                                </button>
                                <button className="bg-red-500 text-white px-4 py-1 rounded-md ml-4 cursor-pointer" onClick={()=>{
                                    handleOrderStatusChange(activeOrder.orderId,"Rejected")
                                }}>
                                    Reject
                                </button>
                            </div>
                            <table className="w-full mt-4">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeOrder.orderedItems.map(item => (
                                        <tr key={item.product.key} >
                                            <td className="p-2">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-12 h-12 rounded object-cover border"
                                                />
                                            </td>
                                            <td className="p-2">{item.product.name}</td>
                                            <td className="p-2">{item.quantity}</td>
                                            <td className="p-2">Rs. {item.product.price.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }

        </div>
    );
}
