import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./log-and-reg/Login";
import Register from "./log-and-reg/Register";
import LandingPage from "./User/LadingPage"; // Fixed typo
import Navigation from "./User/Navigation";
import MyComplaints from "./User/Mycomplaints"; // Fixed naming style
import About from "./User/About";
import Form from "./User/Form";
import Management from "./User/Managment"; // Fixed typo in name
import Complaint from "./admin/Complaint";
import Sidebar from "./admin/Sidebar";
import User from "./admin/User";
import ComplaintManagement from "./admin/Complaintmanagment"; // Fixed typo
import Dashboard from "./admin/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminControl from "./admin/AdminControl";
import ForgotPass from "./log-and-reg/ForgotPass";
import ResetPass from "./log-and-reg/ResetPass";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    toast.error("Access Denied. Please login.");
    return <Navigate to="/" />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    toast.error("Access Denied. Admins only.");
    return <Navigate to="/" />;
  }

  return children;
};

// const NavigationLayout = () => (
//   <>
//     <Navigation />
//     <Outlet />
//   </>
// );

// const SidebarLayout = () => (
//   <>
//     <Sidebar />
//     <Outlet />
//   </>
// );

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={1500} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/admin/adminControl" element={<AdminControl />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPass />} />

        {/* User Routes - Protected */}
        <Route
          path="/landing"
          element={
            <ProtectedRoute>
              <Navigation />
            </ProtectedRoute>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="complaint" element={<MyComplaints />} />
          <Route path="about" element={<About />} />
          <Route path="form" element={<Form />} />
          <Route path="profile" element={<Management />} />
        </Route>

        {/* Admin Routes - Protected */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Sidebar />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="complaint" element={<Complaint />} />
          <Route path="user" element={<User />} />
          <Route path="complaintmanage" element={<ComplaintManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/reg" element={<Register />} />
//         <Route path="/manage" element={<Management />} />

//         {/* User Routes */}
//         <Route path="/landing" element={<Navigation />}>
//           <Route index element={<LandingPage />} />
//           <Route path="complaint" element={<MyComplaints />} />
//           <Route path="about" element={<About />} />
//           <Route path="form" element={<Form />} />
//         </Route>

//         {/* Admin Routes */}
//         <Route path="/admin" element={<Sidebar />}>
//           <Route index element={<Dashboard />} />
//           <Route path="Complaint" element={<Complaint />} />
//           <Route path="user" element={<User />} />
//           <Route path="complaintmanage" element={<ComplaintManagement />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
