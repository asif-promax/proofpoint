import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid"; // Import the trash icon
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
      await axios.delete(`http://localhost:5000/users/deleteusers/${id}`);

      // Update state after successful deletion
      setUsers((prevUsers) => prevUsers.filter((users) => users._id !== id));
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  return (
    <div className="w-4/5 bg-blue-100  p-4">
      <div className="flex items-center justify-between mb-2 border-b">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Link to="/adminControl">
          <button className=" px-2 py-0.5 m-1 rounded text-white bg-blue-600 ">
            Add User and Admin
          </button>
        </Link>
      </div>

      {/* Admins Table */}
      <h2 className="text-xl font-semibold">Admins</h2>
      <table className="w-full border-collapse border border-gray-300 mt-1">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-1.5">Name</th>
            <th className="border px-4 py-1.5">Email</th>
            <th className="border px-4 py-1.5">Number</th>{" "}
            <th className="border px-4 py-1.5">Delete</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id} className="bg-white border">
              <td className="border px-4 py-0.5">{admin.name}</td>
              <td className="border px-4 py-0.5">{admin.email}</td>
              <td className="border px-4 py-0.5">{admin.number}</td>
              <td className="border px-4 py-0.5">
              <button
                  onClick={() => handleDeleteUsers(admin._id)}
                  className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-600 transition"
                >
                  <TrashIcon className="w-3.5" /> {/* Trash icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Users Table */}
      <h2 className="text-xl font-semibold mt-4">Users</h2>
      <table className="w-full border-collapse border border-gray-300 mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-1.5">Name</th>
            <th className="border px-4 py-1.5">Email</th>
            <th className="border px-4 py-1.5">Number</th>
            <th className="border px-4 py-1.5">Delete</th>
          </tr>
        </thead>
        <tbody>
          {normalUsers.map((user) => (
            <tr key={user._id} className="bg-white border">
              <td className="border px-4 py-0.5">{user.name}</td>
              <td className="border px-4 py-0.5">{user.email}</td>
              <td className="border px-4 py-0.5">{user.number}</td>
              <td className="border px-4 py-0.5">
                <button
                  onClick={() => handleDeleteUsers(user._id)}
                  className="flex items-center px-3 py-1 bg-red-400 text-white rounded hover:bg-red-600 transition"
                >
                  <TrashIcon className="w-3.5" /> {/* Trash icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
