import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaComments,
  FaChartLine,
} from "react-icons/fa";
import { useGetAllStudentsQuery } from "../../../redux/api/Auth";
import { useGetAllCounselingDetailsQuery } from "../../../redux/api/Counseling";
import { useGetAllEventsQuery } from "../../../redux/api/Events";
import { useGetAllGrievancesQuery } from "../../../redux/api/Grievance";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // API hooks for real data
  const {
    data: studentsData,
    isLoading: isLoadingStudents,
    error: studentsError,
  } = useGetAllStudentsQuery();

  const {
    data: counselingData,
    isLoading: isLoadingCounseling,
    error: counselingError,
  } = useGetAllCounselingDetailsQuery();

  const {
    data: eventsData,
    isLoading: isLoadingEvents,
    error: eventsError,
  } = useGetAllEventsQuery();

  const {
    data: grievancesData,
    isLoading: isLoadingGrievances,
    error: grievancesError,
  } = useGetAllGrievancesQuery();

  // Calculate real counts from API data
  const totalStudents = studentsData?.stats?.totalStudents || 0;
  const totalEvents = eventsData?.count || 0;
  const pendingGrievances = grievancesData?.count || 0;
  const counselingRequests = counselingData?.count || 0;

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalEvents: 0,
    pendingGrievances: 0,
    counselingRequests: 0,
    studentGrowth: 12.5,
    eventGrowth: 8.2,
    grievanceGrowth: -15.3,
    counselingGrowth: 25.7,
  });

  // Update stats when API data changes
  useEffect(() => {
    setStats((prevStats) => ({
      ...prevStats,
      totalStudents,
      totalEvents,
      pendingGrievances,
      counselingRequests,
    }));
  }, [totalStudents, totalEvents, pendingGrievances, counselingRequests]);

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents.toLocaleString(),
      icon: FaUsers,
      change: stats.studentGrowth,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: FaCalendarAlt,
      change: stats.eventGrowth,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      title: "Total Grievances",
      value: stats.pendingGrievances,
      icon: FaExclamationTriangle,
      change: stats.grievanceGrowth,
      color: "red",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
    },
    {
      title: "Total Counselings",
      value: stats.counselingRequests,
      icon: FaComments,
      change: stats.counselingGrowth,
      color: "purple",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="space-y-3 xs:space-y-4 sm:space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3 xs:space-y-4 sm:space-y-6"
      >
        {/* Welcome Section */}
        <motion.div
          variants={cardVariants}
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-6 text-white"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 xs:gap-4">
            <div className="flex-1">
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-1 xs:mb-2">
                Welcome back, Admin!
              </h1>
              <p className="text-indigo-100 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed">
                Here's what's happening with your Student Affairs Management
                System today.
              </p>
            </div>
            <div className="hidden xs:block">
              <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaChartLine className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-indigo-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={cardVariants}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6"
        >
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`${card.bgColor} rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-6 shadow-sm border border-gray-100`}
              >
                <div className="flex items-center justify-between mb-2 xs:mb-3 sm:mb-4">
                  <div
                    className={`p-1.5 xs:p-2 sm:p-3 rounded-md xs:rounded-lg ${card.bgColor} ${card.iconColor}`}
                  >
                    <Icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div>
                  <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {isLoadingStudents ||
                    isLoadingEvents ||
                    isLoadingGrievances ||
                    isLoadingCounseling ? (
                      <div className="animate-pulse bg-gray-300 h-6 xs:h-7 sm:h-8 w-12 xs:w-14 sm:w-16 rounded"></div>
                    ) : (
                      card.value
                    )}
                  </p>
                  <p className="text-gray-600 text-xs xs:text-sm font-medium">
                    {card.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-900 mb-3 xs:mb-4 sm:mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/admin/students")}
              className="flex items-center space-x-2 xs:space-x-3 p-2.5 xs:p-3 sm:p-4 rounded-md xs:rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            >
              <div className="p-1.5 xs:p-2 bg-indigo-100 rounded-md xs:rounded-lg">
                <FaUsers className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-indigo-600" />
              </div>
              <span className="font-medium text-gray-900 text-xs xs:text-sm sm:text-base">
                Manage Students
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/admin/events")}
              className="flex items-center space-x-2 xs:space-x-3 p-2.5 xs:p-3 sm:p-4 rounded-md xs:rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-200 transition-colors"
            >
              <div className="p-1.5 xs:p-2 bg-green-100 rounded-md xs:rounded-lg">
                <FaCalendarAlt className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <span className="font-medium text-gray-900 text-xs xs:text-sm sm:text-base">
                Create Event
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/admin/grievances")}
              className="flex items-center space-x-2 xs:space-x-3 p-2.5 xs:p-3 sm:p-4 rounded-md xs:rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors"
            >
              <div className="p-1.5 xs:p-2 bg-red-100 rounded-md xs:rounded-lg">
                <FaExclamationTriangle className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <span className="font-medium text-gray-900 text-xs xs:text-sm sm:text-base">
                Review Grievances
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/admin/counseling")}
              className="flex items-center space-x-2 xs:space-x-3 p-2.5 xs:p-3 sm:p-4 rounded-md xs:rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-200 transition-colors"
            >
              <div className="p-1.5 xs:p-2 bg-purple-100 rounded-md xs:rounded-lg">
                <FaComments className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <span className="font-medium text-gray-900 text-xs xs:text-sm sm:text-base">
                Counseling Sessions
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
