// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {FaTimes} from "react-icons/fa";


// const API_URL = "http://localhost:5000/complaint";

// const ComplaintManagement = () => {
//   const [complaintModels, setComplaintModels] = useState([]);
//   const [complaintModelName, setComplaintModelName] = useState("");
//   const [complaintTypes, setComplaintTypes] = useState([]);
//   const [newComplaintType, setNewComplaintType] = useState("");

//   // Fetch all complaint models from the backend
//   useEffect(() => {
//     const fetchComplaintModels = async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/all`);
//         console.log("all data", data);

//         setComplaintModels(data);
//       } catch (error) {
//         console.error("Error fetching complaint models:", error);
//       }
//     };

//     fetchComplaintModels();
//     // console.log("ComplaintModels",complaintModels);
//   }, []);

//   // Add a new complaint model with types
//   const handleAddComplaintModel = async () => {
//     if (!complaintModelName || complaintTypes.length === 0) {
//       alert(
//         "Please enter a complaint model and add at least one complaint type."
//       );
//       return;
//     }

//     try {
//       await axios.post(`${API_URL}/add`, {
//         models: complaintModelName,
//         complaintTypes: complaintTypes,
//       });
//       // console.log("complaintModelName",complaintModelName);
//       // console.log("ComplaintTypes",complaintTypes);

//       // Clear input fields
//       setComplaintModelName("");
//       setComplaintTypes([]);

//       // Fetch updated data
//       const { data } = await axios.get(`${API_URL}/all`);
//       setComplaintModels(data);
//       // console.log("new ComplaintModels",complaintModels);
//     } catch (error) {
//       console.error("Error adding complaint model:", error);
//     }
//   };

//   // Delete a complaint model
//   const handleDeleteComplaintModel = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/delete/${id}`);
//       setComplaintModels((prevModels) =>
//         prevModels.filter((model) => model._id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting complaint model:", error);
//     }
//   };

//   const handleDeleteComplaintType = async (modelId, typeToRemove) => {
//     try {
//       await axios.put(`${API_URL}/remove-type/${modelId}`, {
//         typeToRemove,
//       });

//       // Update the local state to remove the type
//       setComplaintModels((prevModels) =>
//         prevModels.map((model) =>
//           model._id === modelId
//             ? {
//                 ...model,
//                 complaintTypes: model.complaintTypes.filter(
//                   (type) => type !== typeToRemove
//                 ),
//               }
//             : model
//         )
//       );
//     } catch (error) {
//       console.error("Error deleting complaint type:", error);
//     }
//   };

//   return (
//     <div className="p-4 w-4/5 bg-blue-100">
//       <h2 className="text-xl font-semibold">Manage Complaints</h2>

//       {/* Complaint Model & Type Input */}
//       {/* <div className="flex flex-col sm:flex-row gap-4"> */}
//       <div className="bg-white p-4 rounded-lg w-full">
//         <label className="block font-medium">Complaint Model</label>
//         <input
//           type="text"
//           className="border w-full p-2 rounded mt-2"
//           value={complaintModelName}
//           onChange={(e) => setComplaintModelName(e.target.value)}
//         />

//         <label className="block font-medium mt-4">Complaint Types</label>
//         <div className="flex gap-2 mt-2">
//           <input
//             type="text"
//             className="border w-full p-2 rounded"
//             value={newComplaintType}
//             onChange={(e) => setNewComplaintType(e.target.value)}
//           />
//           <button
//             onClick={() => {
//               if (newComplaintType) {
//                 setComplaintTypes([...complaintTypes, newComplaintType]);
//                 setNewComplaintType("");
//               }
//             }}
//             className="bg-blue-500 text-white px-3 py-1 rounded"
//           >
//             Add
//           </button>
//         </div>

//         <div className="mt-2">
//           {complaintTypes.map((type, index) => (
//             <div
//               key={index}
//               className="flex justify-between items-center border-b py-1"
//             >
//               <p>{type}</p>
//               <button
//                 onClick={() =>
//                   setComplaintTypes(
//                     complaintTypes.filter((_, i) => i !== index)
//                   )
//                 }
//                 className="text-red-500 text-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={handleAddComplaintModel}
//           className="bg-green-500 text-white px-3 py-1 mt-4 rounded "
//         >
//           Add Complaint Model
//         </button>
//       </div>
//       {/* </div> */}

//       {/* Display Complaint Models */}
//       <h3 className="text-lg font-semibold mt-4 mb-1">All Complaint Models</h3>
//       <div className="mt- bg-white p-4 rounded-lg">
//         {complaintModels.length > 0 ? (
//           complaintModels.map((model) => (
//             <div
//               key={model._id}
//               className="border-b py-2 flex justify-around items-center"
//             >
//               <h4 className="font-medium">{model.models}</h4>
//               <ul className="ml-4 text-sm text-gray-600">
//                 {model.complaintTypes.map((type, index) => (
//                   <li key={index} className="flex items-center justify-between">
//                     <p>- {type}</p>
//                     <button
//                       onClick={() => handleDeleteComplaintType(model._id, type)}
//                       className="bg-red-500 text-white ms-3 px-3 py-0.5 my-0.5 rounded"
//                     >
//                     <FaTimes size={15} className=" " />
                      
//                     </button>
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 onClick={() => handleDeleteComplaintModel(model._id)}
//                 className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No complaint models available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ComplaintManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes, FaTrashAlt } from "react-icons/fa";

const API_URL = "http://localhost:5000/complaint";

const ComplaintManagement = () => {
  const [complaintModels, setComplaintModels] = useState([]);
  const [complaintModelName, setComplaintModelName] = useState("");
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [newComplaintType, setNewComplaintType] = useState("");

  useEffect(() => {
    const fetchComplaintModels = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/all`);
        setComplaintModels(data);
      } catch (error) {
        console.error("Error fetching complaint models:", error);
      }
    };
    fetchComplaintModels();
  }, []);

  const handleAddComplaintModel = async () => {
    if (!complaintModelName || complaintTypes.length === 0) {
      alert("Please enter a complaint model and add at least one complaint type.");
      return;
    }

    try {
      await axios.post(`${API_URL}/add`, {
        models: complaintModelName,
        complaintTypes: complaintTypes,
      });

      setComplaintModelName("");
      setComplaintTypes([]);
      const { data } = await axios.get(`${API_URL}/all`);
      setComplaintModels(data);
    } catch (error) {
      console.error("Error adding complaint model:", error);
    }
  };

  const handleDeleteComplaintModel = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setComplaintModels((prevModels) => prevModels.filter((model) => model._id !== id));
    } catch (error) {
      console.error("Error deleting complaint model:", error);
    }
  };

  const handleDeleteComplaintType = async (modelId, typeToRemove) => {
    try {
      await axios.put(`${API_URL}/remove-type/${modelId}`, { typeToRemove });

      setComplaintModels((prevModels) =>
        prevModels.map((model) =>
          model._id === modelId
            ? {
                ...model,
                complaintTypes: model.complaintTypes.filter((type) => type !== typeToRemove),
              }
            : model
        )
      );
    } catch (error) {
      console.error("Error deleting complaint type:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📋 Complaint Management</h2>

      {/* Compact Form Section */}
      <div className="bg-white p-4 rounded-lg shadow-mdw-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">➕ Add Complaint Model</h3>
        
        <div className="flex gap-2">
          <input
            type="text"
            className="border border-gray-300 w-full p-2 rounded text-sm focus:ring-2 focus:ring-blue-500"
            value={complaintModelName}
            onChange={(e) => setComplaintModelName(e.target.value)}
            placeholder="Enter model name..."
          />
          <button
            onClick={handleAddComplaintModel}
            className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>

        <label className="block text-gray-700 font-medium mt-3">Complaint Types</label>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            className="border border-gray-300 w-full p-2 rounded text-sm focus:ring-2 focus:ring-blue-500"
            value={newComplaintType}
            onChange={(e) => setNewComplaintType(e.target.value)}
            placeholder="Enter complaint type..."
          />
          <button
            onClick={() => {
              if (newComplaintType) {
                setComplaintTypes([...complaintTypes, newComplaintType]);
                setNewComplaintType("");
              }
            }}
            className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* Scrollable list of complaint types */}
        <div className="mt-3 max-h-32 overflow-y-auto shadow rounded p-2">
          {complaintTypes.map((type, index) => (
            <div key={index} className="flex justify-between items-center border-b py-1 text-sm">
              <p>{type}</p>
              <button
                onClick={() => setComplaintTypes(complaintTypes.filter((_, i) => i !== index))}
                className="text-red-500 hover:text-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Complaint Models List in Grid */}
      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4 text-center">📦 All Complaint Models</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mx-auto">
        {complaintModels.length > 0 ? (
          complaintModels.map((model) => (
            <div key={model._id} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-md font-semibold">{model.models}</h4>
              <ul className="mt-2 text-gray-700 text-sm">
                {model.complaintTypes.map((type, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <p>- {type}</p>
                    <button
                      onClick={() => handleDeleteComplaintType(model._id, type)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition"
                    >
                      <FaTimes size={10} />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleDeleteComplaintModel(model._id)}
                className="bg-red-500 text-white px-3 py-2 mt-2 rounded text-sm hover:bg-red-600 transition w-full"
              >
                <FaTrashAlt className="inline-block mr-2" /> Delete Model
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No complaint models available.</p>
        )}
      </div>
    </div>
  );
};

export default ComplaintManagement;
