import { useEffect, useState } from "react";
import axios from "axios";
import { FaBoxOpen, FaClipboardList, FaStar, FaUsers } from "react-icons/fa";

export default function AdminDashboard() {
    const [productCount, setProductCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`${backendUrl}/api/products`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setProductCount(res.data.length))
            .catch(err => console.log(err));

        axios.get(`${backendUrl}/api/orders/`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setOrderCount(res.data.length))
            .catch(err => console.log(err));

        axios.get(`${backendUrl}/api/reviews/`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setReviewCount(res.data.length))
            .catch(err => console.log(err));

        axios.get(`${backendUrl}/api/users/all`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setUserCount(res.data.length))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition">
                    <div>
                        <h2 className="text-gray-600 text-lg">Total Products</h2>
                        <p className="text-3xl font-bold text-accent">{productCount}</p>
                    </div>
                    <FaBoxOpen className="text-5xl text-accent" />
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition">
                    <div>
                        <h2 className="text-gray-600 text-lg">Total Orders</h2>
                        <p className="text-3xl font-bold text-accent">{orderCount}</p>
                    </div>
                    <FaClipboardList className="text-5xl text-accent" />
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition">
                    <div>
                        <h2 className="text-gray-600 text-lg">Total Reviews</h2>
                        <p className="text-3xl font-bold text-accent">{reviewCount}</p>
                    </div>
                    <FaStar className="text-5xl text-accent" />
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition">
                    <div>
                        <h2 className="text-gray-600 text-lg">Total Users</h2>
                        <p className="text-3xl font-bold text-accent">{userCount}</p>
                    </div>
                    <FaUsers className="text-5xl text-accent" />
                </div>

            </div>
        </div>
    );
}
