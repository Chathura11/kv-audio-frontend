import { useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function InquiryPage() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        message: ""
    });
    const [editedMessages, setEditedMessages] = useState({});

    useEffect(() => {
        if (loading) {
            fetchInquiries();
        }
    }, [loading]);

    function fetchInquiries() {
        const token = localStorage.getItem('token');
        setLoading(true);
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setInquiries(res.data);
            const initialEdits = {};
            res.data.forEach(item => {
                initialEdits[item._id] = item.message;
            });
            setEditedMessages(initialEdits);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            toast.error("Failed to load inquiries!");
            setLoading(false);
        });
    }

    function handleUpdateInquiry(inquiry) {
        const token = localStorage.getItem('token');
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${inquiry.id}`, {
            message: editedMessages[inquiry._id]  // use updated text
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            toast.success('Inquiry updated successfully!');
            setLoading(true);
        })
        .catch(error => {
            console.error(error);
            toast.error("Failed to update inquiry");
            setLoading(true);
        });
    }

    function handleCreateInquiry(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            toast.success("Inquiry submitted!");
            setFormData({ message: "" });
            setLoading(true);
        })
        .catch(err => {
            console.error(err);
            toast.error("Failed to submit inquiry");
        });
    }

    function handleDeleteInquiry(inquiry) {
        const token = localStorage.getItem('token');
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${inquiry.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            toast.success('Inquiry deleted successfully!');
            setLoading(true);
        })
        .catch(error => {
            console.error(error);
            toast.error("Failed to delete inquiry");
            setLoading(true);
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center py-10">
            <h1 className="text-4xl font-bold mb-8 text-accent">Customer Inquiries</h1>

            {/* Create Inquiry Section */}
            <form 
                onSubmit={handleCreateInquiry}
                className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-md mb-8"
            >
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create a New Inquiry</h2>

                <textarea
                    placeholder="Your Message"
                    className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                ></textarea>

                <button
                    type="submit"
                    className="w-full bg-accent text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-900 transition cursor-pointer"
                >
                    <FaPaperPlane />
                    Submit Inquiry
                </button>
            </form>

            {/* Inquiry List Section */}
            {loading ? (
                <div className="flex items-center justify-center h-40">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : inquiries.length === 0 ? (
                <p className="text-gray-600 text-lg">No inquiries found.</p>
            ) : (
                <div className="flex flex-col gap-4 w-full max-w-4xl px-4">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry._id} className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-center relative">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">{inquiry.email}</h2>
                                <p className="text-gray-600 mb-1"><strong>Phone:</strong> {inquiry.phone}</p>

                                <p className="text-gray-600 mb-1"><strong>Message:</strong></p>
                                {!inquiry.isResolved ?
                                    <textarea
                                        cols="30"
                                        rows="2"
                                        className="w-full p-2 border rounded-lg mt-1"
                                        value={editedMessages[inquiry._id] || ""}
                                        onChange={(e) => setEditedMessages({
                                            ...editedMessages,
                                            [inquiry._id]: e.target.value
                                        })}
                                    ></textarea>
                                    :
                                    <p className="text-gray-600 mb-1">{inquiry.message}</p>
                                }
                                {!inquiry.isResolved &&
                                    <div className="flex gap-2 mt-4 mb-4 ">
                                        <button
                                            onClick={() => handleUpdateInquiry(inquiry)}
                                            className="w-[200px] flex items-center justify-center bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition cursor-pointer"
                                        >
                                            Update Message
                                        </button>

                                        
                                    </div>
                                }

                                <p className="text-gray-600 mb-1"><strong>Response:</strong> {inquiry.response !== "" ? inquiry.response : "Not Responded"}</p>
                                <p className="text-gray-500 text-sm mb-3 absolute right-15 top-3">Date: {new Date(inquiry.date).toLocaleDateString()}</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${inquiry.isResolved ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'}`}>
                                    {inquiry.isResolved ? "Resolved" : "Pending"}
                                </span>
                            </div>

                            
                            <div
                                className="p-2 hover:text-white hover:bg-red-500 cursor-pointer bg-white rounded-xl border border-gray-200 flex items-center justify-center absolute right-1 top-1"
                                onClick={() => handleDeleteInquiry(inquiry)}
                            >
                                <MdDelete size={20} />
                            </div>
                        </div>
                        
                    ))}
                </div>
            )}
        </div>
    );
}
