import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/complaint";

const Form = () => {
  const [formData, setFormData] = useState({
    model: "",
    complaintType: "",
    place: "",
    district: "",
    date: "",
    time: "",
    proof: null,

  });
  const [complaintModels, setComplaintModels] = useState([]);

  useEffect(() => {
    const fetchComplaintModels = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/all`);
        console.log("All Complaint Models:", data);
        setComplaintModels(data);
      } catch (error) {
        console.error("Error fetching complaint models:", error);
      }
    };

    fetchComplaintModels();
  }, []);

  // Handle input change
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/complaintForm/add",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is sent
          },
        }
      );
  
      console.log("Response:", response.data);
      alert("Complaint submitted successfully!");
  
      setFormData({
        model: "",
        complaintType: "",
        place: "",
        district: "",
        date: "",
        time: "",
        proof: null,
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };
  

  return (
    <div className="py-7 min-h-screen flex flex-col items-center  justify-center bg-gray-50 p-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Report Issues Seamlessly
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Our platform empowers users to submit complaints with ease, offering
          tools to upload multimedia for comprehensive issue reporting.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mx-8">
          {/* Complaint Model Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Complaint Model
            </label>
            <select
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg  border-blue-300"
            >
              <option value="">Select Complaint Model</option>
              {complaintModels.map((option, index) => (
                <option key={index} value={option.models}>
                  {option.models}
                </option>
              ))}
            </select>
          </div>

          {/* Complaint Type - Dynamic Options */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Complaint Type
            </label>
            <select
              name="complaintType"
              value={formData.complaintType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg border-blue-300"
              disabled={!formData.model} // Disable until model is selected
            >
              <option value="">Select Complaint Type</option>
              {complaintModels
                .find((model) => model.models === formData.model)
                ?.complaintTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div>

          {/* Place Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg border-blue-300"
              placeholder="Enter the place"
            />
          </div>

          {/* District Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg border-blue-300"
            >
              <option value="">Select District</option>
              {[
                "Thiruvananthapuram",
                "Kollam",
                "Alappuzha",
                "Pathanamthitta",
                "Kottayam",
                "Idukki",
                "Ernakulam",
                "Thrissur",
                "Palakkad",
                "Malappuram",
                "Kozhikode",
                "Wayanad",
                "Kannur",
                "Kasaragod",
              ].map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border-blue-300 w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Time Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="border-blue-300 w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Proof File Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Proof</label>
            <div className="bg-blue-300 w-full rounded-lg">
              <input
                type="file"
                name="proof"
                onChange={handleChange}
                accept="image/*, video/*"
                className="block w-full px-3 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
