import { AiFillDashboard } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiFileListFill } from "react-icons/ri";
import { Link, useLocation, Outlet } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/admin", icon: <AiFillDashboard />, label: "Overview" },
    { path: "/admin/Complaint", icon: <MdReportProblem />, label: "Complaints" },
    { path: "/admin/user", icon: <FaUsers />, label: "User Management" },
    { path: "/admin/complaintmanage", icon: <RiFileListFill />, label: "Manage Complaints" },
  ];

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <aside className="sticky top-0 w-2/10 min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 shadow-xl px-4 py-6 rounded-r-xl">
        <h1 className="text-2xl text-center text-white font-bold mb-8">
          <span className="text-blue-200">Proof</span>Point
        </h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-blue-100 hover:bg-blue-700"
                  }`}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="w-9/10"><Outlet /></div>
    </div>
  );
};

export default Sidebar;
