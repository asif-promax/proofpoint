import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get stored token
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("http://localhost:5000/users/users", {
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 Fix: Send token in headers
          },
        });

        console.log("Fetched Users:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.response?.data || error);
      }
    };

    fetchUsers();
  }, []);

  // Separate users and admins
  const admins = users.filter((user) => user.role === "admin");
  const normalUsers = users.filter((user) => user.role === "user");

  const handleDeleteUsers = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/users/deleteusers/${id}`);

      // Update state after successful deletion
      setUsers((prevUsers) => prevUsers.filter((users) => users._id !== id));
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  return (
    <div className="w-4/5 bg-blue-100 mx-auto  p-4">
      <h1 className="text-2xl font-bold mb-4 border-b">User Management</h1>

      {/* Admins Table */}
      <h2 className="text-xl font-semibold mt-4">Admins</h2>
      <table className="w-full border-collapse border border-gray-300 mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Number</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id} className="bg-white border">
              <td className="border px-4 py-2">{admin.name}</td>
              <td className="border px-4 py-2">{admin.email}</td>
              <td className="border px-4 py-2">{admin.number}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Users Table */}
      <h2 className="text-xl font-semibold mt-6">Users</h2>
      <table className="w-full border-collapse border border-gray-300 mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Number</th>
            <th className="border px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {normalUsers.map((user) => (
            <tr key={user._id} className="bg-white border">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.number}</td>
              <td className="border px-4 py-2">
                <button onClick={()=>handleDeleteUsers(user._id)} className="px-4 py-1 bg-red-500 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
