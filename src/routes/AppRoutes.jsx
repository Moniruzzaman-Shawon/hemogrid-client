import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import useAuthContext from "../hooks/useAuthContext";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";

// ProtectedRoute component
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {/* <DashboardLayout /> */}
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="admin" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
