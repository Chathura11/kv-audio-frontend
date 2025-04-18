import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

export default function AdminItemPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`${backendUrl}/api/products`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setItems(res.data);
            setLoading(false);
        }).catch((error) => {
            toast.error(error.response?.data?.error || "Error fetching items.");
            setLoading(false);
        });
    }, []);

    const handleDelete = (id) => {
        const token = localStorage.getItem("token");

        axios.delete(`${backendUrl}/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            toast.success("Item deleted successfully!");
            setItems(prev => prev.filter(item => item.key !== id));
        }).catch((error) => {
            toast.error(error.response?.data?.error || "Error deleting item.");
        });
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Items Page</h1>

            {loading ? (
                <div className="flex justify-center items-center mt-20">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : items.length === 0 ? (
                <div className="text-gray-600 text-lg mt-10">No items found.</div>
            ) : (
                <div className="overflow-x-auto w-full shadow-md rounded-lg bg-white">
                    <table className="min-w-full text-gray-700">
                        <thead className="bg-gray-100 uppercase text-xs font-semibold">
                            <tr>
                                <th className="py-3 px-4 text-left">Key</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Price</th>
                                <th className="py-3 px-4 text-left">Category</th>
                                <th className="py-3 px-4 text-left">Dimensions</th>
                                <th className="py-3 px-4 text-left">Availability</th>
                                <th className="py-3 px-4 text-left">Description</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.key} className="hover:bg-gray-50">
                                    <td className="py-2 px-4">{item.key}</td>
                                    <td className="py-2 px-4">{item.name}</td>
                                    <td className="py-2 px-4">${item.price}</td>
                                    <td className="py-2 px-4">{item.category}</td>
                                    <td className="py-2 px-4">{item.dimensions}</td>
                                    <td className="py-2 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.availability ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-700'}`}>
                                            {item.availability ? 'Available' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 max-w-xs truncate">{item.description}</td>
                                    <td className="py-2 px-4 flex justify-center gap-3">
                                        <button
                                            onClick={() => navigate('/admin/items/edit', { state: item })}
                                            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.key)}
                                            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Link
                to="/admin/items/add"
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition"
            >
                <CiCirclePlus className="text-4xl" />
            </Link>
        </div>
    );
}
