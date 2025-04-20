import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUserCircle } from "react-icons/fa";
import { LuSpeaker } from "react-icons/lu";
import { MdOutlinePreview } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemPage from "./adminItemPage";
import AddItemPage from "./addItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminReviewPage from "./adminReviewPage";
import AdminDashboard from "./adminDashboard";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const user = res.data;
      if (user.role === "admin") {
        setUserValidated(true);
      } else {
        window.location.href = '/';
      }
    }).catch(error => {
      console.error(error);
      setUserValidated(false);
    });
  }, []);

  return (
    <div className="w-full h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 h-full bg-[#037c6e] text-white flex flex-col shadow-lg">
        <Link to="/admin" className="flex items-center gap-3 p-4 text-lg hover:bg-[#025043] transition">
          <BsGraphDown className="text-2xl" />
          Dashboard
        </Link>
        <Link to="/admin/orders" className="flex items-center gap-3 p-4 text-lg hover:bg-[#025043] transition">
          <FaRegBookmark className="text-2xl" />
          Orders
        </Link>
        <Link to="/admin/items" className="flex items-center gap-3 p-4 text-lg hover:bg-[#025043] transition">
          <LuSpeaker className="text-2xl" />
          Items
        </Link>
        <Link to="/admin/reviews" className="flex items-center gap-3 p-4 text-lg hover:bg-[#025043] transition">
          <MdOutlinePreview className="text-2xl" />
          Reviews
        </Link>
        <Link to="/admin/users" className="flex items-center gap-3 p-4 text-lg hover:bg-[#025043] transition">
          <FaRegUserCircle className="text-2xl" />
          Users
        </Link>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6 overflow-y-auto">
        {userValidated ? (
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/items" element={<AdminItemPage />} />
            <Route path="/items/add" element={<AddItemPage />} />
            <Route path="/items/edit" element={<AddItemPage edit={true} />} />
            <Route path="/reviews" element={<AdminReviewPage/>} />
          </Routes>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            Validating admin access...
          </div>
        )}
      </main>
    </div>
  );
}
