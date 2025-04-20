import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminReviewPage(){

    const [reviews,setReviews] = useState([]);
    const [loading,setLoading] = useState(true);
    const [activeReview,setActiveReview] = useState(null);
    const [modalOpened,setModalOpened] = useState(false);

    useEffect(() => {
        if (loading) {
            const token = localStorage.getItem('token');

            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data);
                setReviews(res.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            });
        }
    }, [loading]);

    function handleReviewStatusChange(email,status){
        const token = localStorage.getItem('token');
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/approve/${email}`,
            {
                isApproved:status
            },
            {
                headers:{
                            Authorization:`Bearer ${token}`
                        }
            }
        ).then((res)=>{
            console.log(res.data);
            toast.success('Review approved successfully!');
            setModalOpened(false);
            setLoading(true);
            
        }).catch((error)=>{
            console.log(error);
            toast.error('Failed to approve review!');
            setModalOpened(false);
            setLoading(true);
            
        })
    }

    function deleteReview(email){
        console.log(email);
        const token = localStorage.getItem('token');
        console.log(token);
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${email}`,{headers:{
            Authorization:`Bearer ${token}`
        }}
        ).then((res)=>{
            console.log(res.data);
            toast.success('Review deleted successfully!');
            setModalOpened(false);
            setLoading(true);
            
        }).catch((error)=>{
            console.log(error);
            toast.error('Falied to delete review!');
            setModalOpened(false);
            setLoading(true);
            
        })
    }

    return(
        <div className="w-full p-4">
            <h1 className="text-3xl font-bold mb-8">Admin Reviews Page</h1>
            {loading ? (
                <div className="flex justify-center items-center mt-20">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 uppercase text-xs font-semibold">
                            <tr>
                                <th className="p-3">Product</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Rate</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(review => (
                                <tr
                                    key={review._id}
                                    className="hover:bg-gray-50 cursor-pointer transition " 
                                    onClick={() => {
                                        setActiveReview(review);
                                        setModalOpened(true);
                                    }}
                                >
                                    <td className="p-3">{review.productName}</td>
                                    <td className="p-3">{review.email}</td>
                                    <td className="p-3">{new Date(review.date).toLocaleDateString()}</td>
                                    <td className="p-3">{review.rating}</td>
                                    <td className="p-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            review.isApproved
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                            {review.isApproved?"Approved":'Pending'}
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
                            <h1 className="text-2xl font-semibold mb-4">Review Details</h1>
                            <div className="flex flex-col gap-2">
                                <p><span className="font-semibold">Product : </span>{activeReview.productName}</p>
                                <p><span className="font-semibold">Email : </span>{activeReview.email}</p>
                                <p><span className="font-semibold">Date : </span>{activeReview.rating}</p>
                                <p><span className="font-semibold">Comment : </span>{activeReview.comment}</p>
                                <p><span className="font-semibold">Rating : </span>{new Date(activeReview.date).toLocaleDateString()}</p>
                                <p><span className="font-semibold">Approval Status : </span>{activeReview.isApproved?'Approved':'Pending'}</p>
                            </div>
                            <div className="my-5 w-full flex items-center">
                                <button className="bg-green-500 text-white px-4 py-1 rounded-md cursor-pointer hover:bg-green-900" onClick={()=>{
                                    handleReviewStatusChange(activeReview.email,true)
                                }}>
                                    Approve
                                </button>
                                <button className="bg-red-500 text-white px-4 py-1 rounded-md ml-4 cursor-pointer hover:bg-red-900" onClick={()=>{
                                    deleteReview(activeReview.email)
                                }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            

        </div>
    )
}