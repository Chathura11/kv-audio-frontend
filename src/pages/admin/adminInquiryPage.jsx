import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminInquiryPage() {

    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeInquiry, setActiveInquiry] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const [responseText, setResponseText] = useState("");

    useEffect(() => {
        if (loading) {
            const token = localStorage.getItem('token');

            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries/`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => {
                setInquiries(res.data);
                setLoading(false);
            }).catch((error) => {
                console.error(error);
                setLoading(false);
            });
        }
    }, [loading]);

    function handleStatusChange(inquiry) {
        const token = localStorage.getItem('token');
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${inquiry.id}`, {
            isResolved: true,
            response: responseText
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            toast.success('Inquiry marked as resolved!');
            setModalOpened(false);
            setLoading(true);
        })
        .catch(error => {
            console.error(error);
            toast.error("Failed to update inquiry");
            setModalOpened(false);
            setLoading(true);
        });
    }

    function deleteInquiry(inquiry) {
        const token = localStorage.getItem('token');
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${inquiry.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            toast.success('Inquiry deleted successfully!');
            setModalOpened(false);
            setLoading(true);
        })
        .catch(error => {
            console.error(error);
            toast.error("Failed to delete inquiry");
            setModalOpened(false);
            setLoading(true);
        });
    }

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-accent">Admin Inquiry Page</h1>

            {loading ? (
                <div className="flex justify-center items-center mt-20">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-200 uppercase text-xs font-semibold">
                            <tr>
                                <th className="p-3">Email</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Message</th>
                                <th className="p-3">Response</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map(inquiry => (
                                <tr
                                    key={inquiry._id}
                                    className="hover:bg-gray-50 cursor-pointer transition"
                                    onClick={() => {
                                        setActiveInquiry(inquiry);
                                        setResponseText(inquiry.response || "");
                                        setModalOpened(true);
                                    }}
                                >
                                    <td className="p-3">{inquiry.email}</td>
                                    <td className="p-3">{new Date(inquiry.date).toLocaleDateString()}</td>
                                    <td className="p-3">{inquiry.message}</td>
                                    <td className="p-3">{inquiry.response !== "" ? inquiry.response : "Not Responded"}</td>
                                    <td className="p-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${inquiry.isResolved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                            {inquiry.isResolved ? "Resolved" : 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {modalOpened && activeInquiry && (
                <div className="fixed top-0 left-0 w-full h-full bg-[#00000090] flex justify-center items-center">
                    <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg relative">
                        <IoMdCloseCircleOutline
                            className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-600"
                            onClick={() => setModalOpened(false)}
                        />
                        <h1 className="text-2xl font-semibold mb-4">Review Details</h1>
                        <div className="flex flex-col gap-2">
                            <p><span className="font-semibold">Email : </span>{activeInquiry.email}</p>
                            <p><span className="font-semibold">Date : </span>{new Date(activeInquiry.date).toLocaleDateString()}</p>
                            <p><span className="font-semibold">Message : </span>{activeInquiry.message}</p>
                            <p><span className="font-semibold">Resolve Status : </span>{activeInquiry.isResolved ? 'Resolved' : 'Pending'}</p>

                            <div className="flex flex-col gap-2 mt-3">
                                <label className="font-semibold">Response:</label>
                                <textarea
                                    className="w-full border p-2 rounded-md"
                                    rows="4"
                                    placeholder="Type your response here..."
                                    value={responseText}
                                    onChange={(e) => setResponseText(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="my-5 w-full flex items-center">
                            <button
                                className="bg-green-500 text-white px-4 py-1 rounded-md cursor-pointer hover:bg-green-600"
                                onClick={() => handleStatusChange(activeInquiry)}
                            >
                                Mark as Resolved
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded-md ml-4 cursor-pointer hover:bg-red-600"
                                onClick={() => deleteInquiry(activeInquiry)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
