import React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiFileListFill } from "react-icons/ri";
import { Outlet, Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <div className="flex w-full p-1">
      {/* Sidebar */}

      <aside className="sticky bottom-0 min-h-screen  w-1/5 bg-blue-700 px-3 py-3 rounded-lg">
        <h1
          className="text-3xl text-center text-gray-300 font-semibold"
          style={{ fontFamily: "'Sofia', sans-serif" }}
        >
          ProofPoint
        </h1>
        <ul className="pt-3 ">
          <Link to={"/admin"}>
            <li
              className={`px-3 py-2 my-1 rounded-2xl ${
                isActive("/admin") ? "bg-white text-blue-600" : " text-white"
              } hover:bg-white hover:text-blue-600 font-medium cursor-pointer rounded-lg py-1 flex gap-2 transition duration-300`}
            >
              <AiFillDashboard size={20} />
              Overview
            </li>
          </Link>
          <Link to={"/admin/Complaint"}>
            <li
              className={`px-3 py-2 my-1 rounded-2xl ${
                isActive("/admin/Complaint")
                  ? "bg-white text-blue-600"
                  : "text-white "
              } hover:bg-white hover:text-blue-600 font-medium cursor-pointer rounded-lg py-1 flex gap-2 transition duration-300`}
            >
              <MdReportProblem size={20} />
              Complaints
            </li>
          </Link>
          <Link to={"/admin/user"}>
            <li
              className={`px-3 py-2 my-1 rounded-2xl ${
                isActive("/admin/user")
                  ? "bg-white text-blue-600"
                  : "text-white "
              } hover:bg-white hover:text-blue-600 font-medium cursor-pointer rounded-lg py-1 flex gap-2 transition duration-300`}
            >
              <FaUsers size={20} />
              User Managment
            </li>
          </Link>

          <Link to={"/admin/complaintmanage"}>
            <li
              className={`px-3 py-2 my-1 rounded-2xl ${
                isActive("/admin/complaintmanage")
                  ? "bg-white text-blue-600"
                  : " text-white"
              } hover:bg-white hover:text-blue-600 font-medium cursor-pointer rounded-lg py-1 flex gap-2 transition duration-300`}
            >
              <RiFileListFill size={20} />
              Manage Complaints
            </li>
          </Link>
        </ul>
      </aside>
      <Outlet />
    </div>
  );
};

export default Sidebar;
