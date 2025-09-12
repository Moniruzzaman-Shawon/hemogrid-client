import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";

import AdminDashboard from "../pages/dashboard/AdminDashboard";
import UserDashboard from "../pages/dashboard/UserDashboard";
import AdminLayout from "../components/layouts/AdminLayout";
import { useAuthContext } from "../context/AuthContext";
import BloodRequestList from "../pages/blood/BloodRequestList";
import DonorList from "../pages/blood/DonorList";
import CreateBloodRequest from "../pages/blood/CreateBloodRequest";
import VerifyEmail from "../pages/auth/VerifyEmail";

// ProtectedRoute component
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;
  return children;
};

// Layout for nested dashboard routes
const DashboardLayout = () => <Outlet />;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email/:uid/:token" element={<VerifyEmail />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blood-requests" element={<BloodRequestList />} />
        <Route path="/donors" element={<DonorList />} />

        {/* CreateBloodRequest is protected, wrap with ProtectedRoute */}
        <Route
          path="/create-blood-requests"
          element={
            <ProtectedRoute>
              <CreateBloodRequest />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />

        {/* Admin Routes */}
        <Route
          path="admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          {/* Add more admin nested pages here */}
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
