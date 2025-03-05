import React, { useEffect, useState } from "react";
import axios from "axios";

const Mycomplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const res = await axios.get(
          "http://localhost:5000/complaintForm/my-complaints",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setComplaints(res.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  const handleDeleteUserComplaint = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/complaintForm/my-complaints-delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update state after successful deletion
      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint._id !== id)
      );
    } catch (error) {
      console.error("Error deleting user complaint:", error);
    }
  };

  // Function to check if 1 hour has passed since submission
  const isWithinOneHour = (complaintDate) => {
    const now = new Date();
    const complaintTime = new Date(complaintDate);
    const timeDifference = (now - complaintTime) / (1000 * 60 * 60); // Convert to hours
    return timeDifference < 1; // Return true if within 1 hour
  };

  return (
    <div className="px-12 mt-10 min-h-screen">
      <div className="border-b pb-4 text-center space-y-4">
        <h1 className="text-4xl font-semiboldbold">My Complaints</h1>
        <p>
          View the ongoing and resolved complaints to understand how we address
          user issues effectively.
        </p>
      </div>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <ul>
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="border p-4 my-4 sm:flex rounded-lg shadow-md bg-gray-100"
            >
              <div className="w-full">
                <h3 className="text-lg font-semibold">
                  Type: {complaint.complaintType}
                </h3>
                <p>
                  <strong>Model:</strong> {complaint.model}
                </p>
                <p>
                  <strong>Place:</strong> {complaint.place},{" "}
                  {complaint.district}
                </p>
                <p>
                  <strong>Date:</strong> {complaint.date} |{" "}
                  <strong>Time:</strong> {complaint.time}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      complaint.status === "pending"
                        ? "bg-gray-500"
                        : complaint.status === "solved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {complaint.status}
                  </span>
                </p>
                {isWithinOneHour(complaint.createdAt) && (
                  <button
                    onClick={() => handleDeleteUserComplaint(complaint._id)}
                    className="bg-red-500 px-3 py-1 rounded-lg text-white mt-2"
                  >
                    Delete
                  </button>
                )}
              </div>

              <div className="w-full">
                {/* Display Proof (Images/Videos) */}
                {complaint.proof.length > 0 && (
                  <div className="mt-2 ">
                    <h4 className="font-semibold text-center">Proof:</h4>
                    <div className="space-x-2 ">
                      {complaint.proof.map((file, index) => (
                        <div className="" key={index}>
                          {file.match(/\.(jpeg|jpg|png)$/) ? (
                            <img
                              src={file}
                              alt="Proof"
                              className="w-auto h-70 m-auto rounded-lg"
                            />
                          ) : file.match(/\.(mp4|avi|mov)$/) ? (
                            <video controls width="200" className="rounded-lg w-auto h-70 m-auto">
                              <source src={file} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show Delete Button Only If Complaint is Within 1 Hour */}
                
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Mycomplaints;
