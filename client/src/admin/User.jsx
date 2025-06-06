import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const UserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("http://localhost:5000/users/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.response?.data || error);
      }
    };

    fetchUsers();
  }, []);

  // Separate admins and users
  const admins = users.filter((user) => user.role === "admin");
  const normalUsers = users.filter((user) => user.role === "user");

  const handleDeleteUsers = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/deleteusers/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg p-5">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-1">
        <h1 className="text-3xl font-bold text-blue-800">User Management</h1>
        <Link to="/admin/adminControl">
          <button className="px-4 py-1  rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm transition">
            + Add User/Admin
          </button>
        </Link>
      </div>

      {/* Admins Table */}
      <section className="mt-1">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Admins</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-1.5 text-left">Name</th>
                <th className="px-4 py-1.5 text-left">Email</th>
                <th className="px-4 py-1.5 text-left">Number</th>
                <th className="px-4 py-1.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={admin._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="px-4 py-1">{admin.name}</td>
                  <td className="px-4 py-1">{admin.email}</td>
                  <td className="px-4 py-1">{admin.number}</td>
                  <td className="px-4 py-1 text-center">
                    <button
                      onClick={() => handleDeleteUsers(admin._id)}
                      className="px-3 py-1 bg-red-500 m-auto text-white rounded-md hover:bg-red-600 transition flex items-center justify-center"
                    >
                      <TrashIcon className="w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Users Table */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-1.5 text-left">Name</th>
                <th className="px-4 py-1.5 text-left">Email</th>
                <th className="px-4 py-1.5 text-left">Number</th>
                <th className="px-4 py-1.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {normalUsers.map((user, index) => (
                <tr key={user._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="px-4 py-1">{user.name}</td>
                  <td className="px-4 py-1">{user.email}</td>
                  <td className="px-4 py-1">{user.number}</td>
                  <td className="px-4 py-1 text-center">
                    <button
                      onClick={() => handleDeleteUsers(user._id)}
                      className="px-3 py-1 m-auto bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center justify-center"
                    >
                      <TrashIcon className="w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default UserPage;