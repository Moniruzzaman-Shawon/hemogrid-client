import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import AdminLayout from "../components/layouts/AdminLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResendVerification from "../pages/auth/ResendVerification";

import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";

import AdminDashboard from "../pages/dashboard/AdminDashboard";
import UserDashboard from "../pages/dashboard/UserDashboard";
import DonorDashboard from "../pages/dashboard/DonorDashboard";
import UserProfile from "../pages/UserProfile";

import BloodRequestList from "../pages/blood/BloodRequestList";
import DonorList from "../pages/blood/DonorList";
import CreateBloodRequest from "../pages/blood/CreateBloodRequest";
import AdminBloodRequestList from "../pages/blood/AdminBloodRequestList";

import ForgotPassword from "../pages/passwords/ForgotPassword";
import ResetPassword from "../pages/passwords/ResetPassword";
import ChangePassword from "../pages/passwords/ChangePassword";

import { useAuthContext } from "../context/AuthContext";
import AdminUserList from "../pages/admin/AdminUserList";
import AdminUserSuspend from "../pages/admin/AdminUserSuspend";
import AdminUserVerify from "../pages/admin/AdminUserVerify";
import AdminStats from "../pages/blood/AdminStats";

// ProtectedRoute component
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;
  return children;
};

// Public-only route: if logged in, redirect to dashboard
const PublicOnlyRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

// Layout for nested dashboard routes
const DashboardLayout = () => <Outlet />;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blood-requests" element={<BloodRequestList />} />
        <Route path="donors" element={<DonorList />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:uidb64/:token" element={<ResetPassword />} />
        <Route path="reset-password/:uidb64/:token/" element={<ResetPassword />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/verify-email/:uidb64/:token" element={<VerifyEmail />} />
      <Route path="/verify-email/:uidb64/:token/" element={<VerifyEmail />} />
      <Route path="/resend-verification" element={<ResendVerification />} />

      {/* Protected Routes */}
      <Route path="/create-blood-requests" element={<ProtectedRoute><CreateBloodRequest /></ProtectedRoute>} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* User Routes */}
        <Route index element={<UserDashboard />} />
        <Route path="donor" element={<DonorDashboard />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="manage-passwords" element={<ChangePassword />} />

        {/* Admin Routes */}
        <Route
          path="admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />                  {/* /dashboard/admin */}
          <Route path="users" element={<AdminUserList />} />           {/* /dashboard/admin/users */}
          <Route path="users/:id/suspend" element={<AdminUserSuspend />} /> {/* /dashboard/admin/users/:id/suspend */}
          <Route path="users/:id/verify" element={<AdminUserVerify />} />   {/* /dashboard/admin/users/:id/verify */}
          <Route path="requests" element={<AdminBloodRequestList />} />     {/* /dashboard/admin/requests */}
          <Route path="stats" element={<AdminStats />} />                   {/* /dashboard/admin/stats */}
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
