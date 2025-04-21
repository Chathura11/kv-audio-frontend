import { useEffect, useState } from "react";
import axios from "axios";
import { FaBoxOpen, FaClipboardList, FaStar, FaUsers, FaQuestionCircle } from "react-icons/fa";

export default function AdminDashboard() {
    const [productCount, setProductCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [inquiryCount, setInquiryCount] = useState(0);

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

        axios.get(`${backendUrl}/api/inquiries`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setInquiryCount(res.data.length))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-accent">Admin Overview</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

                <Card title="Total Products" count={productCount} Icon={FaBoxOpen} bg="bg-blue-100" text="text-blue-700" />
                <Card title="Total Orders" count={orderCount} Icon={FaClipboardList} bg="bg-yellow-100" text="text-yellow-700" />
                <Card title="Total Reviews" count={reviewCount} Icon={FaStar} bg="bg-purple-100" text="text-purple-700" />
                <Card title="Total Users" count={userCount} Icon={FaUsers} bg="bg-green-100" text="text-green-700" />
                <Card title="Total Inquiries" count={inquiryCount} Icon={FaQuestionCircle} bg="bg-red-100" text="text-red-700" />

            </div>
        </div>
    );
}

function Card({ title, count, Icon, bg, text }) {
    return (
        <div className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition bg-white flex flex-col justify-between`}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
                <Icon className={`text-4xl ${text}`} />
            </div>
            <div className="flex justify-between items-center">
                <span className={`text-3xl font-bold ${text}`}>{count}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
                    {count > 0 ? "Active" : "Empty"}
                </span>
            </div>
        </div>
    );
}
