import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaCog,
  FaBell,
  FaExclamationTriangle,
  FaComments,
  FaGraduationCap,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../redux/slices/User";
import { adminAccessKey } from "../utils/constants";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const adminMenuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: FaHome,
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: FaGraduationCap,
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: FaCalendarAlt,
    },
    {
      name: "Grievances",
      path: "/admin/grievances",
      icon: FaExclamationTriangle,
    },
    {
      name: "Counseling",
      path: "/admin/counseling",
      icon: FaComments,
    },
  ];

  const logoutHandler = () => {
    // Clear localStorage
    localStorage.removeItem(adminAccessKey);

    // Dispatch logout action
    dispatch(logoutAction());

    // Show success message
    toast.success("Logged out successfully!");

    // Navigate to admin login
    navigate("/admin/login");
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Redirect to admin login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem(adminAccessKey);
    console.log("AdminLayout - Token check:", token);
    console.log("AdminLayout - User state:", user);

    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/admin/login");
    }
  }, [navigate, user]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 z-50">
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute w-24 h-24 border-3 border-indigo-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.p
            className="text-indigo-500 text-2xl font-bold"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontFamily: "dancingScript" }}
          >
            SAMS Admin
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
        <div className="flex flex-col h-full bg-white shadow-xl">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1
                  className="text-indigo-500 text-2xl font-bold"
                  style={{ fontFamily: "dancingScript" }}
                >
                  SAMS
                </h1>
                <p className="text-gray-500 text-sm">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {adminMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <FaUserCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "admin@sams.com"}
                </p>
              </div>
            </div>
            <button
              onClick={logoutHandler}
              className="w-full mt-3 flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1
                  className="text-indigo-500 text-2xl font-bold"
                  style={{ fontFamily: "dancingScript" }}
                >
                  SAMS
                </h1>
                <p className="text-gray-500 text-sm">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {adminMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <FaUserCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "admin@sams.com"}
                </p>
              </div>
            </div>
            <button
              onClick={logoutHandler}
              className="w-full mt-3 flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaBars className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {adminMenuItems.find(
                    (item) => item.path === location.pathname
                  )?.name || "Dashboard"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  Welcome back, Admin! Here's what's happening today.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-3 sm:p-4 lg:p-6 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
