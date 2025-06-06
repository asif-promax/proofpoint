import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

const Mycomplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);


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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report History</h1>
          <p className="text-gray-500">Manage and review your submitted incident reports</p>
        </div>
      </header>

      {complaints.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by submitting a new incident report</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Complaint List */}
          <div className="lg:w-1/3 space-y-4">
            <div className="bg-white shadow-xs rounded-lg p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold text-gray-700">All Reports ({complaints.length})</h2>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <span className="sr-only">Filter</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {complaints.map((complaint) => (
                  <div
                    key={complaint._id}
                    onClick={() => setSelectedComplaint(complaint)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedComplaint?._id === complaint._id 
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {complaint.complaintType}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDistanceToNow(new Date(complaint.createdAt))} ago
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        complaint.status === 'pending' 
                          ? 'bg-amber-100 text-amber-800'
                          : complaint.status === 'solved' 
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Complaint Detail */}
          <div className="lg:w-2/3">
            {selectedComplaint ? (
              <div className="bg-white shadow-xs rounded-lg p-6 border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedComplaint.complaintType}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Reported {formatDistanceToNow(new Date(selectedComplaint.createdAt))} ago
                    </p>
                  </div>
                  {isWithinOneHour(selectedComplaint.createdAt) && (
                    <button
                      onClick={() => handleDeleteUserComplaint(selectedComplaint._id)}
                      className="text-red-600 hover:text-red-800 flex items-center text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Vehicle Details</h4>
                    <dl className="mt-2 space-y-1">
                      <div>
                        <dt className="text-sm text-gray-600">Model</dt>
                        <dd className="text-sm text-gray-900">{selectedComplaint.model}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Incident Details</h4>
                    <dl className="mt-2 space-y-1">
                      <div>
                        <dt className="text-sm text-gray-600">Location</dt>
                        <dd className="text-sm text-gray-900">
                          {selectedComplaint.place}, {selectedComplaint.district}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-600">Date & Time</dt>
                        <dd className="text-sm text-gray-900">
                          {selectedComplaint.date} | {selectedComplaint.time}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {selectedComplaint.proof.length > 0 && (
                    <div className="col-span-2">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Evidence</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedComplaint.proof.map((file, index) => (
                          <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                            {file.match(/\.(jpeg|jpg|png)$/) ? (
                              <img
                                src={file}
                                alt="Proof"
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                              />
                            ) : file.match(/\.(mp4|avi|mov)$/) ? (
                              <video
                                controls
                                className="w-full h-full object-cover"
                              >
                                <source src={file} type="video/mp4" />
                              </video>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-sm">Select a report to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mycomplaints;