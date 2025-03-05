import React, { useState, useEffect } from "react";
import axios from "axios";

const Management = () => {
  const [data, setData] = useState({
    name: "",
    number: "",
    email: "",
  });

  const [userId, setUserId] = useState(""); // Store user ID
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch user profile when the component mounts
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/updateUsers/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData({
          name: response.data.name,
          number: response.data.number,
          email: response.data.email,
        });
        setUserId(response.data._id);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/updateUsers/updateusers/${userId}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message);
      console.log(response.data);
      
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white p-4">
        <div className="bg-white m-auto mt-10 p-8 rounded-2xl shadow-md max-w-lg w-full">
          <h1 className="text-2xl font-semibold text-center mb-4">
            Account Management
          </h1>
          {message && <p className="text-center text-green-500">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="w-full py-2 ps-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                name="number"
                value={data.number}
                onChange={handleChange}
                className="w-full py-2 ps-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="w-full py-2 ps-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Management;
