import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaUser,
  FaGraduationCap,
  FaBuilding,
  FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useGetAllStudentsQuery } from "../../../redux/api/Auth";

const AdminStudents = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Prepare API parameters
  const apiParams = {
    page: currentPage,
    limit: studentsPerPage,
  };

  // Only add month parameter if a specific month is selected
  if (filterMonth !== "all") {
    apiParams.month = filterMonth;
  }

  // API call for getting students
  const {
    data: studentsData,
    isLoading,
    error,
    refetch,
  } = useGetAllStudentsQuery(apiParams);

  const students = studentsData?.data || [];
  const pagination = studentsData?.pagination || {};
  const stats = studentsData?.stats || {};

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterMonth]);

  // Calculate statistics from API data
  const totalStudents = stats.totalStudents || students.length;
  const verifiedStudents = students.filter(
    (s) => s.status === "verified"
  ).length;
  const unverifiedStudents = students.filter(
    (s) => s.status === "unverified"
  ).length;

  // Filter students based on status filter
  const filteredStudents = students.filter((student) => {
    const matchesStatus =
      filterStatus === "all" || student.status === filterStatus;

    return matchesStatus;
  });

  // Use API pagination data
  const totalPages = pagination.totalPages || 1;
  const currentStudents = filteredStudents;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <FaCheckCircle className="w-4 h-4 text-green-500" />;
      case "unverified":
        return <FaTimesCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FaExclamationCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "unverified":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 p-4 max-w-full overflow-hidden"
    >
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Students Management
          </h1>
          <p className="text-gray-600 text-sm">
            Manage and monitor all registered students
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={cardVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {[
          {
            title: "Total Students",
            value: totalStudents,
            color: "blue",
            icon: FaUsers,
          },
          {
            title: "Verified Students",
            value: verifiedStudents,
            color: "green",
            icon: FaUserCheck,
          },
          {
            title: "Unverified Students",
            value: unverifiedStudents,
            color: "red",
            icon: FaUserTimes,
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`bg-${stat.color}-50 rounded-lg p-3 shadow-sm border border-${stat.color}-100`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-xs">{stat.title}</p>
                </div>
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-4 h-4 text-${stat.color}-500`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center space-x-2">
            <FaFilter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="w-4 h-4 text-gray-400" />
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            >
              <option value="all">All Months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Students Table */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-3 py-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-2"></div>
                    <p className="text-gray-500 text-sm">Loading students...</p>
                  </td>
                </tr>
              ) : currentStudents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-3 py-8 text-center">
                    <FaUsers className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      No students found
                    </h3>
                    <p className="text-gray-500 text-xs">
                      No students match your current filters
                    </p>
                  </td>
                </tr>
              ) : (
                currentStudents.map((student) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <FaUser className="h-4 w-4 text-indigo-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {student.fullName || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {student.registrationNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <FaEnvelope className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-xs">{student.email}</span>
                        </div>
                        <div className="flex items-center">
                          <FaPhone className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-xs">{student.phoneNo}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(student.status)}
                        <span
                          className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            student.status
                          )}`}
                        >
                          {student.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="text-indigo-600 hover:text-indigo-900 p-1"
                          title="View Details"
                        >
                          <FaEye className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-3 py-2 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-2 relative inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * studentsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * studentsPerPage,
                      pagination.totalItems || 0
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {pagination.totalItems || 0}
                  </span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded shadow-sm -space-x-px">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-2 py-1 border text-xs font-medium ${
                          page === currentPage
                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </nav>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Student Details Modal */}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Student Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Student Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedStudent.fullName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Registration Number
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedStudent.registrationNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedStudent.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone Number
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedStudent.phoneNo}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <div className="flex items-center">
                      {getStatusIcon(selectedStudent.status)}
                      <span
                        className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          selectedStudent.status
                        )}`}
                      >
                        {selectedStudent.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Role
                    </label>
                    <p className="text-sm text-gray-900 capitalize">
                      {selectedStudent.role}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Created At
                    </label>
                    <p className="text-sm text-gray-900">
                      {formatDate(selectedStudent.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Last Updated
                    </label>
                    <p className="text-sm text-gray-900">
                      {formatDate(selectedStudent.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Admin Info */}
              {selectedStudent.admin && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">
                    Admin Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Admin Name
                      </label>
                      <p className="text-sm text-gray-900">
                        {selectedStudent.admin.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Admin Email
                      </label>
                      <p className="text-sm text-gray-900">
                        {selectedStudent.admin.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Admin Phone
                      </label>
                      <p className="text-sm text-gray-900">
                        {selectedStudent.admin.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminStudents;
