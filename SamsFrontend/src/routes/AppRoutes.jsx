import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import AdminLayout from "../layout/AdminLayout";
import AdminAuthLayout from "../layout/AdminAuthLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthGuard from "../components/AuthGuard";

import Home from "../pages/Home";
import About from "../pages/about";
import Grievance from "../pages/grievance";
import Events from "../pages/events";
import Counseling from "../pages/counseling";
import Feedback from "../pages/feedback";
import Contact from "../pages/contact";
import PrivacyPolicy from "../pages/privacypolicy";
import CookiePolicy from "../pages/cookiePolicy";
import Terms from "../pages/termsandconditions";
import FAQs from "../pages/faqs";
import ResetPassword from "../pages/reset";
import LearnMore from "../pages/learnmore";
import VerifyEmail from "../pages/verify-email";
import EmailVerification from "../pages/emailVerification";
import Profile from "../pages/profile";

import Login from "../pages/Auth/login";
import Signup from "../pages/Auth/signup";

// Admin Pages
import AdminLogin from "../pages/Admin/Login";
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminEvents from "../pages/Admin/Events";
import AdminGrievances from "../pages/Admin/Grievances";
import AdminStudents from "../pages/Admin/Students";
import AdminCounseling from "../pages/Admin/Counseling";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
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
        SAMS
      </motion.p>
    </div>
  </div>
);

const AppRoutes = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/events" element={<Events />} />
          <Route path="/counseling" element={<Counseling />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />

          {/* Protected User Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute requireAuth={true} requireAdmin={false}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <AuthGuard isAdminRoute={false}>
                <Login />
              </AuthGuard>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthGuard isAdminRoute={false}>
                <Signup />
              </AuthGuard>
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminAuthLayout />}>
          <Route
            path="/admin/login"
            element={
              <AuthGuard isAdminRoute={true}>
                <AdminLogin />
              </AuthGuard>
            }
          />
        </Route>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireAuth={true} requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute requireAuth={true} requireAdmin={true}>
                <AdminEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/grievances"
            element={
              <ProtectedRoute requireAuth={true} requireAdmin={true}>
                <AdminGrievances />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute requireAuth={true} requireAdmin={true}>
                <AdminStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/counseling"
            element={
              <ProtectedRoute requireAuth={true} requireAdmin={true}>
                <AdminCounseling />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
