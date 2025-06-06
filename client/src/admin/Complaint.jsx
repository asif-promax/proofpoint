
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FaEye, FaTimes, FaCheckCircle } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/allcomplaints/all-complaints?page=${currentPage}&status=${filter}`
        );
        setComplaints(response.data.complaints);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(
          "Error fetching complaints:",
          error.response?.data || error
        );
      }
    };

    fetchComplaints();
  }, [currentPage, filter]);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/allcomplaints/update-status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status } : complaint
        )
      );
    } catch (error) {
      console.error(
        `Error updating complaint status to ${status}:`,
        error.response?.data || error
      );
    }
  };

  // Function to open the modal and set selected complaint
  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComplaint(null);
  };
  const generatePDF = async () => {
    if (!selectedComplaint) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4", // A4 size: 210mm x 297mm
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
    const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
    let yOffset = 20; // Starting position

    // Title
    doc.setFontSize(20);
    doc.text("Complaint Details", 14, yOffset);
    yOffset += 10;

    // Complaint Details Table
    const details = [
      ["Field", "Value"],
      ["Email", selectedComplaint.user?.email || "No Email"],
      ["Phone", selectedComplaint.user?.number || "No Phone"],
      ["Model", selectedComplaint.model],
      ["Type", selectedComplaint.complaintType],
      ["Place", selectedComplaint.place + " - " + selectedComplaint.district],
      ["Date & Time", selectedComplaint.date + " - " + selectedComplaint.time],
      ["Status", selectedComplaint.status],
    ];

    doc.autoTable({
      startY: yOffset,
      head: details.slice(0, 1),
      body: details.slice(1),
      styles: { fontSize: 10, cellPadding: 2 },
      columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 130 } }, // Ensure it fits within A4
    });

    yOffset = doc.autoTable.previous.finalY + 10; // Move below table

    // Adding Proof Images
    if (selectedComplaint.proof.length > 0) {
      doc.setFontSize(16);
      doc.text("Proof:", 14, yOffset);
      yOffset += 10;

      for (const file of selectedComplaint.proof) {
        if (file.match(/\.(jpeg|jpg|png)$/)) {
          try {
            // Convert image URL to Base64
            const base64Image = await getBase64FromUrl(file);

            // Load image to get its original dimensions
            const img = new Image();
            img.src = file;
            await new Promise((resolve) => (img.onload = resolve));

            // Set max image dimensions to fit within A4 (max width: 180mm, max height: 120mm)
            const maxWidth = 180;
            const maxHeight = 120;
            const aspectRatio = img.width / img.height;

            let imageWidth = maxWidth;
            let imageHeight = imageWidth / aspectRatio;

            if (imageHeight > maxHeight) {
              imageHeight = maxHeight;
              imageWidth = imageHeight * aspectRatio;
            }

            // Ensure the image doesn't exceed page height
            if (yOffset + imageHeight > pageHeight - 20) {
              doc.addPage(); // Add new page if needed
              yOffset = 20;
            }

            doc.addImage(
              base64Image,
              "JPEG",
              15,
              yOffset,
              imageWidth,
              imageHeight
            );
            yOffset += imageHeight + 10; // Adjust spacing
          } catch (error) {
            console.error("Error loading image:", error);
          }
        }
      }
    }

    doc.save(`Complaint_${selectedComplaint._id}.pdf`);
  };

  // Function to convert image URL to Base64
  const getBase64FromUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    });
  };

  return (
    <div className="flex-1 bg-gray-100">
      <div className="bg-white p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-1">
          <h2 className="text-2xl font-bold text-gray-800">User Complaints</h2>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Download Report
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mt-2">
          {["all", "solved", "rejected"].map((status) => (
            <button
              key={status}
              className={`px-4 py-1 rounded-lg transition ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => {
                setFilter(status);
                setCurrentPage(1);
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} Complaints
            </button>
          ))}
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full border-collapse rounded-lg shadow-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                {[
                  "Email",
                  "Phone",
                  "Model",
                  "Type",
                  "Place",
                  "Date & Time",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th key={heading} className="px-4 text-left">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-sm">
              {complaints.map((complaint) => (
                <tr
                  key={complaint._id}
                  className="hover:bg-gray-100 transition"
                >
                  <td className="px-4 ">
                    {complaint.user?.email || "No Email"}
                  </td>
                  <td className="px-4 ">
                    {complaint.user?.number || "No Phone"}
                  </td>
                  <td className="px-4">{complaint.model}</td>
                  <td className="px-4 ">{complaint.complaintType}</td>
                  <td className="px-4 ">
                    {complaint.place} - {complaint.district}
                  </td>
                  <td className="px-4 ">
                    {complaint.date} - {complaint.time}
                  </td>
                  <td
                    className={`px-4  font-semibold ${
                      complaint.status === "solved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {complaint.status}
                  </td>
                  <td className="px-4 py-3 flex space-x-2">
                    <button
                      onClick={() => updateStatus(complaint._id, "solved")}
                      className="text-green-600 hover:text-green-800 transition"
                    >
                      <FaCheckCircle size={20} />
                    </button>
                    <button
                      onClick={() => updateStatus(complaint._id, "rejected")}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <FaTimes size={20} />
                    </button>
                    <button
                      onClick={() => openModal(complaint)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <FaEye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && selectedComplaint && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div
              ref={modalRef}
              className="bg-white flex flex-col md:flex-row p-5 rounded-lg shadow-lg w-11/12 md:w-8/12 max-h-[90vh] overflow-y-auto border"
            >
              {/* Left Section - Complaint Details */}
              <div className="w-full md:w-3/12 border-r p-3">
                <h2 className="text-xl font-bold mb-4">Complaint Details</h2>
                <p>
                  <strong>Email:</strong> {selectedComplaint.user?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedComplaint.user?.number}
                </p>
                <p>
                  <strong>Model:</strong> {selectedComplaint.model}
                </p>
                <p>
                  <strong>Complaint Type:</strong>{" "}
                  {selectedComplaint.complaintType}
                </p>
                <p>
                  <strong>Place:</strong> {selectedComplaint.place} -{" "}
                  {selectedComplaint.district}
                </p>
                <p>
                  <strong>Date & Time:</strong> {selectedComplaint.date} -{" "}
                  {selectedComplaint.time}
                </p>
              </div>

              {/* Right Section - Proof Images/Videos */}
              <div className="w-full md:w-9/12 p-3 overflow-y-auto max-h-[75vh]">
                {selectedComplaint.proof.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-center">Proof:</h3>
                    <div className="flex flex-wrap gap-4 justify-center mt-2">
                      {selectedComplaint.proof.map((file, index) => (
                        <div
                          key={index}
                          className="rounded-lg shadow-md max-w-full"
                        >
                          {file.match(/\.(jpeg|jpg|png)$/) ? (
                            <img
                              src={file}
                              alt="Proof"
                              className="w-auto max-w-full max-h-[400px] object-contain rounded-md"
                            />
                          ) : file.match(/\.(mp4|avi|mov)$/) ? (
                            <video
                              controls
                              className="w-auto max-w-full max-h-[400px] object-contain rounded-md"
                            >
                              <source src={file} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={closeModal}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                  <button
                    onClick={generatePDF}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage >= totalPages
                ? "opacity-50 cursor-not-allowed bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
