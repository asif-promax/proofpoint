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

  // Function to update complaint status (solve/reject)
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/allcomplaints/update-status/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the local state to reflect the change
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
    <div className="flex-1 h- p-4 bg-blue-100">
      <main className="space-y-4">
        <div className="border-b flex justify-between">
          <h2 className="text-xl font-semibold">User Complaints</h2>
        </div>

        {/* Filter Buttons */}
        <div className="space-x-4">
          <button
            className={`px-3 py-1 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => {
              setFilter("all");
              setCurrentPage(1);
            }}
          >
            All Complaints
          </button>
          <button
            className={`px-3 py-1 rounded ${
              filter === "solved" ? "bg-green-500 text-white" : "bg-white"
            }`}
            onClick={() => {
              setFilter("solved");
              setCurrentPage(1);
            }}
          >
            Solved Complaints
          </button>
          <button
            className={`px-3 py-1 rounded ${
              filter === "rejected" ? "bg-red-500 text-white" : "bg-white"
            }`}
            onClick={() => {
              setFilter("rejected");
              setCurrentPage(1);
            }}
          >
            Rejected Complaints
          </button>
        </div>

        {/* Table */}
        <table className="w-full border-collapse border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px- py-2">Email</th>
              <th className="border px- py-2">Phone</th>
              <th className="border px- py-2">Model</th>
              <th className="border px- py-2">Type</th>
              <th className="border px- py-2">Place</th>
              <th className="border px- py-2">Date & Time</th>
              <th className="border px- py-2">Status</th>
              <th className="border px- py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="bg-white border">
                <td className="border px-2 py-">
                  {complaint.user?.email || "No Email"}
                </td>
                <td className="border px-1 py-">
                  {complaint.user?.number || "No Phone"}
                </td>
                <td className="border px-2 py-2">{complaint.model}</td>
                <td className="border px-2 py-">{complaint.complaintType}</td>
                <td className="border px-2 py-">
                  {complaint.place} - {complaint.district}
                </td>
                <td className="border px-2 py-">
                  {complaint.date} - {complaint.time}
                </td>
                <td className="border px-2 py-">{complaint.status}</td>
                <td className="px-2 py-">
                  <div className="flex space-x-1">
                    <button
                      className=" "
                      onClick={() => updateStatus(complaint._id, "solved")}
                    >
                      <FaCheckCircle size={24} color="green" />
                    </button>
                    <button
                      className="bg-red-500 px-1 rounded"
                      onClick={() => updateStatus(complaint._id, "rejected")}
                    >
                      <FaTimes size={15} className=" " />
                    </button>

                    <button
                      className=""
                      onClick={() => openModal(complaint)}
                    >
                      <FaEye className="w-7 h-auto"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal Popup */}
      {isModalOpen && selectedComplaint && (
        <div className="fixed inset-0.5 flex items-center justify-center bg-white">
          <div
            ref={modalRef}
            className=" flex p-5 space-x-3 rounded-lg shadow-lg w-screen border h-screen"
          >
            <div className="w-3/12">
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
            {/* Proof Images/Videos */}
            <div className="w-9/12 p-3 ">
              {selectedComplaint.proof.length > 0 && (
                <div className="">
                  <h3 className="font-semibold text-center">Proof:</h3>
                  {selectedComplaint.proof.map((file, index) => (
                    <div key={index} className="">
                      {file.match(/\.(jpeg|jpg|png)$/) ? (
                        <div className="h-116 flex justify-center">
                          <img
                            src={file}
                            alt="Proof"
                            className="rounded-md h-118"
                          />
                        </div>
                      ) : file.match(/\.(mp4|avi|mov)$/) ? (
                        <video controls className="h-118 m-auto">
                          <source src={file} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}

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
      {/* pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          className={`px-2 py- border rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-2 py- border bg-gray-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-2 py- border rounded ${
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
  );
};

export default Complaint;
