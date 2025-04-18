import { useEffect, useState } from "react";
import axios from 'axios';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            const token = localStorage.getItem("token");

            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data);
                setUsers(res.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            });
        }
    }, [loading]);

    function handleBlockUser(email){
        const token = localStorage.getItem('token');

        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`,{},{headers:{
            Authorization:`Bearer ${token}`
        }}).then((res)=>{
            console.log(res.data);
            setLoading(true);
        }).catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Users Page</h1>
            {loading ? (
                <div>Loading users...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b">Profile</th>
                                <th className="py-2 px-4 border-b">First Name</th>
                                <th className="py-2 px-4 border-b">Last Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Role</th>
                                <th className="py-2 px-4 border-b">Phone</th>
                                <th className="py-2 px-4 border-b">Address</th>
                                <th className="py-2 px-4 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">
                                        <img
                                            src={user.profilePicture}
                                            alt={`${user.firstname} ${user.lastname}`}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">{user.firstname}</td>
                                    <td className="py-2 px-4 border-b">{user.lastname}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b capitalize">{user.role}</td>
                                    <td className="py-2 px-4 border-b">{user.phone}</td>
                                    <td className="py-2 px-4 border-b">{user.address}</td>
                                    <td onClick={()=>handleBlockUser(user.email)} className="py-2 px-4 border-b cursor-pointer">{user.isBlocked?"BLOCKED":"ACTIVE"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
