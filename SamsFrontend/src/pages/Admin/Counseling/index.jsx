import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaComments,
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
  FaClock,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaPlus,
  FaUserMd,
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
  useGetAllCounselingDetailsQuery,
  useAddCounselorMutation,
  useUpdateCounselorMutation,
  useDeleteCounselorMutation,
  useGetStudentSessionsQuery,
  useUpdateStudentSessionMutation,
} from "../../../redux/api/Counseling";
import CreateCounselorModal from "./CreateCounselorModal";
import EditCounselorModal from "./EditCounselorModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import SessionViewModal from "./SessionViewModal";
import EditSessionModal from "./EditSessionModal";

const AdminCounseling = () => {
  // Tab management
  const [activeTab, setActiveTab] = useState("counselors");

  // Counselor management states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [counselorToDelete, setCounselorToDelete] = useState(null);

  // Session management states
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showEditSessionModal, setShowEditSessionModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Create counselor form
  const [counselorForm, setCounselorForm] = useState({
    name: "",
    type: "Personal",
    schedule: {},
  });

  // RTK Query hooks
  const {
    data: counselorsData,
    isLoading: isLoadingCounselors,
    error: counselorsError,
    refetch: refetchCounselors,
  } = useGetAllCounselingDetailsQuery();

  const [addCounselor, { isLoading: isCreating }] = useAddCounselorMutation();
  const [updateCounselor, { isLoading: isUpdating }] =
    useUpdateCounselorMutation();
  const [deleteCounselor, { isLoading: isDeleting }] =
    useDeleteCounselorMutation();

  // Session API hooks
  const {
    data: sessionsData,
    isLoading: isLoadingSessions,
    error: sessionsError,
  } = useGetStudentSessionsQuery();

  const [updateStudentSession, { isLoading: isUpdatingSession }] =
    useUpdateStudentSessionMutation();

  // Session management states
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Days of the week
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const counselorTypes = ["Personal", "Career", "Academic"];

  // Get counselors data from API response
  const counselors = counselorsData?.data || {};

  // Get sessions data from API response
  const sessions = sessionsData?.data || [];

  // Form handlers
  const resetForm = () => {
    setCounselorForm({
      name: "",
      type: "Personal",
      schedule: {},
    });
  };

  const handleCreateCounselor = async () => {
    if (!counselorForm.name.trim()) {
      toast.error("Please enter counselor name");
      return;
    }
    try {
      await addCounselor(counselorForm).unwrap();
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error("Error creating counselor:", error);
    }
  };

  const handleEditCounselor = (counselor) => {
    setSelectedCounselor(counselor);
    setCounselorForm({
      name: counselor.name,
      type: counselor.type || "Personal",
      schedule: counselor.schedule || {},
    });
    setShowEditModal(true);
  };

  const handleUpdateCounselor = async () => {
    if (!counselorForm.name.trim()) {
      toast.error("Please enter counselor name");
      return;
    }
    try {
      await updateCounselor({
        id: selectedCounselor._id,
        updateData: counselorForm,
      }).unwrap();
      setShowEditModal(false);
      setSelectedCounselor(null);
      resetForm();
    } catch (error) {
      console.error("Error updating counselor:", error);
    }
  };

  const handleDeleteCounselor = (counselor) => {
    setCounselorToDelete(counselor);
    setShowDeleteModal(true);
  };

  const confirmDeleteCounselor = async () => {
    if (counselorToDelete) {
      try {
        await deleteCounselor(counselorToDelete._id).unwrap();
        setShowDeleteModal(false);
        setCounselorToDelete(null);
      } catch (error) {
        console.error("Error deleting counselor:", error);
      }
    }
  };

  const cancelDeleteCounselor = () => {
    setShowDeleteModal(false);
    setCounselorToDelete(null);
  };

  // Session handlers
  const handleViewSession = (session) => {
    setSelectedSession(session);
    setShowSessionModal(true);
  };

  const handleEditSession = (session) => {
    setSelectedSession(session);
    setShowEditSessionModal(true);
  };

  const handleUpdateSessionStatus = async (sessionId, newStatus) => {
    try {
      await updateStudentSession({
        id: sessionId,
        updateData: { status: newStatus },
      }).unwrap();
      setShowEditSessionModal(false);
      setSelectedSession(null);
    } catch (error) {
      console.error("Error updating session status:", error);
    }
  };

  const addTimeSlot = (day) => {
    const newSchedule = { ...counselorForm.schedule };
    if (!newSchedule[day]) {
      newSchedule[day] = [];
    }
    newSchedule[day].push("9:00 AM - 10:00 AM");
    setCounselorForm({ ...counselorForm, schedule: newSchedule });
  };

  const removeTimeSlot = (day, index) => {
    const newSchedule = { ...counselorForm.schedule };
    newSchedule[day].splice(index, 1);
    if (newSchedule[day].length === 0) {
      delete newSchedule[day];
    }
    setCounselorForm({ ...counselorForm, schedule: newSchedule });
  };

  const updateTimeSlot = (day, index, newTime) => {
    const newSchedule = { ...counselorForm.schedule };
    newSchedule[day][index] = newTime;
    setCounselorForm({ ...counselorForm, schedule: newSchedule });
  };

  // Filter sessions based on filters
  const filteredSessions = sessions.filter((session) => {
    const matchesStatus =
      filterStatus === "all" || session.status === filterStatus;
    const matchesType =
      filterType === "all" || session.counseling_type === filterType;

    return matchesStatus && matchesType;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="w-4 h-4 text-green-500" />;
      case "completed":
        return <FaCheckCircle className="w-4 h-4 text-blue-500" />;
      case "pending":
        return <FaExclamationCircle className="w-4 h-4 text-yellow-500" />;
      case "rejected":
        return <FaTimesCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FaExclamationCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getUniqueTypes = () => {
    return [...new Set(sessions.map((session) => session.counseling_type))];
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
      className="space-y-3 sm:space-y-4 p-2 sm:p-4 max-w-full overflow-x-hidden"
    >
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3"
      >
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Counseling Management
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm">
            Manage counselors and counseling sessions
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-lg shadow-sm border border-gray-100"
      >
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 px-2 sm:px-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab("counselors")}
              className={`py-2 sm:py-3 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === "counselors"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FaUserMd className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
              Counselors
            </button>
            <button
              onClick={() => setActiveTab("sessions")}
              className={`py-2 sm:py-3 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === "sessions"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FaComments className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
              Sessions
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-2 sm:p-4">
          {activeTab === "counselors" && (
            <div className="space-y-3 sm:space-y-4">
              {/* Counselor Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    Counselor Management
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Manage counselor profiles and schedules
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center px-3 sm:px-4 py-2 bg-indigo-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <FaPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Create Counselor</span>
                  <span className="xs:hidden">Create</span>
                </button>
              </div>

              {/* Counselor List */}
              {isLoadingCounselors ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-indigo-500 mx-auto mb-2"></div>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Loading counselors...
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {Object.keys(counselors).map((type) => (
                    <div
                      key={type}
                      className="bg-gray-50 rounded-lg p-3 sm:p-4"
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                        {type} Counselors
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {counselors[type]?.counselors?.map((counselor) => (
                          <motion.div
                            key={counselor._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-2 sm:mb-3">
                              <div className="flex items-center min-w-0 flex-1">
                                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                  <FaUserMd className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                                </div>
                                <div className="ml-2 sm:ml-3 min-w-0 flex-1">
                                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                                    {counselor.name}
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    {type}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1 flex-shrink-0">
                                <button
                                  onClick={() => handleEditCounselor(counselor)}
                                  className="text-indigo-600 hover:text-indigo-900 p-1"
                                  title="Edit Counselor"
                                >
                                  <FaEdit className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteCounselor(counselor)
                                  }
                                  className="text-red-600 hover:text-red-900 p-1"
                                  title="Delete Counselor"
                                >
                                  <FaTrash className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            {/* Schedule Display */}
                            <div className="space-y-1 sm:space-y-2">
                              <h5 className="text-xs font-medium text-gray-700">
                                Schedule:
                              </h5>
                              <div className="max-h-20 sm:max-h-24 overflow-y-auto">
                                {Object.keys(counselor.schedule || {}).map(
                                  (day) => (
                                    <div key={day} className="text-xs">
                                      <span className="font-medium text-gray-600">
                                        {day}:
                                      </span>
                                      <div className="ml-1 sm:ml-2 space-y-0.5 sm:space-y-1">
                                        {counselor.schedule[day].map(
                                          (time, index) => (
                                            <div
                                              key={index}
                                              className="text-gray-500 text-xs"
                                            >
                                              {time}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "sessions" && (
            <div className="space-y-3 sm:space-y-4">
              {/* Sessions Header */}
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Counseling Sessions
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Manage and monitor all counseling sessions
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                {[
                  {
                    title: "Total Sessions",
                    value: sessions.length,
                    color: "blue",
                    icon: FaComments,
                  },
                  {
                    title: "Approved",
                    value: sessions.filter((s) => s.status === "approved")
                      .length,
                    color: "green",
                    icon: FaCheckCircle,
                  },
                  {
                    title: "Completed",
                    value: sessions.filter((s) => s.status === "completed")
                      .length,
                    color: "blue",
                    icon: FaUserCheck,
                  },
                  {
                    title: "Pending",
                    value: sessions.filter((s) => s.status === "pending")
                      .length,
                    color: "yellow",
                    icon: FaExclamationCircle,
                  },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className={`bg-${stat.color}-50 rounded-lg p-2 sm:p-3 shadow-sm border border-${stat.color}-100 min-h-[80px] sm:min-h-[90px]`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-full">
                        <div className="min-w-0 flex-1 mb-2 sm:mb-0">
                          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                            {stat.value}
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm leading-tight">
                            {stat.title}
                          </p>
                        </div>
                        <div
                          className={`p-2 sm:p-2.5 rounded-lg bg-${stat.color}-100 flex-shrink-0 self-end sm:self-auto`}
                        >
                          <Icon
                            className={`w-4 h-4 sm:w-5 sm:h-5 text-${stat.color}-500`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Filters */}
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <FaFilter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="flex-1 sm:flex-none px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Types</option>
                    {getUniqueTypes().map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sessions Table - Desktop */}
              <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Counselor
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Schedule
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {isLoadingSessions ? (
                        <tr>
                          <td colSpan="6" className="px-3 py-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-2"></div>
                            <p className="text-gray-500 text-sm">
                              Loading sessions...
                            </p>
                          </td>
                        </tr>
                      ) : filteredSessions.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-3 py-8 text-center">
                            <FaComments className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <h3 className="text-sm font-medium text-gray-900 mb-1">
                              No counseling sessions found
                            </h3>
                            <p className="text-gray-500 text-sm">
                              No sessions available at the moment
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredSessions.map((session) => (
                          <motion.tr
                            key={session._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-3 py-4">
                              <div className="flex items-center min-w-0">
                                <div className="flex-shrink-0 h-8 w-8">
                                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <FaUser className="h-4 w-4 text-indigo-600" />
                                  </div>
                                </div>
                                <div className="ml-3 min-w-0 flex-1">
                                  <div className="text-sm font-medium text-gray-900 truncate">
                                    {session.fullName}
                                  </div>
                                  <div className="text-sm text-gray-500 truncate">
                                    {session.registrationNumber}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-4">
                              <div className="text-sm text-gray-900">
                                <div className="font-medium">
                                  {session.counselor_name}
                                </div>
                                <div className="text-gray-500 text-sm">
                                  {session.counseling_type}
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-4">
                              <div className="flex items-center">
                                <FaGraduationCap className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                                <span className="text-sm text-gray-900 truncate">
                                  {session.counseling_type}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-4">
                              <div className="text-sm text-gray-900">
                                <div className="flex items-center mb-1">
                                  <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                                  <span className="text-sm truncate">
                                    {session.day}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <FaClock className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                                  <span className="text-sm truncate">
                                    {session.time_slot}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-4">
                              <div className="flex items-center">
                                {getStatusIcon(session.status)}
                                <span
                                  className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                    session.status
                                  )}`}
                                >
                                  {session.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleViewSession(session)}
                                  className="text-indigo-600 hover:text-indigo-900 p-1"
                                  title="View Details"
                                >
                                  <FaEye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleEditSession(session)}
                                  className="text-blue-600 hover:text-blue-900 p-1"
                                  title="Edit Status"
                                >
                                  <FaEdit className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Results Count */}
                <div className="bg-white px-3 py-3 border-t border-gray-200">
                  <p className="text-sm text-gray-700">
                    Showing {filteredSessions.length} of {sessions.length}{" "}
                    sessions
                  </p>
                </div>
              </div>

              {/* Mobile Card Layout */}
              <div className="lg:hidden space-y-3">
                {isLoadingSessions ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-2"></div>
                    <p className="text-gray-500 text-sm">Loading sessions...</p>
                  </div>
                ) : filteredSessions.length === 0 ? (
                  <div className="text-center py-8">
                    <FaComments className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      No counseling sessions found
                    </h3>
                    <p className="text-gray-500 text-sm">
                      No sessions available at the moment
                    </p>
                  </div>
                ) : (
                  filteredSessions.map((session) => (
                    <motion.div
                      key={session._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <FaUser className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="ml-3 min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {session.fullName}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {session.registrationNumber}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <button
                            onClick={() => handleViewSession(session)}
                            className="text-indigo-600 hover:text-indigo-900 p-1"
                            title="View Details"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditSession(session)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit Status"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs font-medium text-gray-500 mb-1">
                            Counselor
                          </div>
                          <div className="text-sm text-gray-900">
                            {session.counselor_name}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-500 mb-1">
                            Type
                          </div>
                          <div className="flex items-center">
                            <FaGraduationCap className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {session.counseling_type}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-500 mb-1">
                            Day
                          </div>
                          <div className="flex items-center">
                            <FaCalendarAlt className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {session.day}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-500 mb-1">
                            Time
                          </div>
                          <div className="flex items-center">
                            <FaClock className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {session.time_slot}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {getStatusIcon(session.status)}
                            <span
                              className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                session.status
                              )}`}
                            >
                              {session.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Create Counselor Modal */}
      <CreateCounselorModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        counselorForm={counselorForm}
        setCounselorForm={setCounselorForm}
        onSubmit={handleCreateCounselor}
        daysOfWeek={daysOfWeek}
        counselorTypes={counselorTypes}
        addTimeSlot={addTimeSlot}
        removeTimeSlot={removeTimeSlot}
        updateTimeSlot={updateTimeSlot}
      />

      {/* Edit Counselor Modal */}
      <EditCounselorModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCounselor(null);
          resetForm();
        }}
        counselorForm={counselorForm}
        setCounselorForm={setCounselorForm}
        onSubmit={handleUpdateCounselor}
        daysOfWeek={daysOfWeek}
        counselorTypes={counselorTypes}
        addTimeSlot={addTimeSlot}
        removeTimeSlot={removeTimeSlot}
        updateTimeSlot={updateTimeSlot}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={cancelDeleteCounselor}
        onConfirm={confirmDeleteCounselor}
        counselorName={counselorToDelete?.name}
        isLoading={isDeleting}
      />

      {/* Session View Modal */}
      <SessionViewModal
        isOpen={showSessionModal}
        onClose={() => {
          setShowSessionModal(false);
          setSelectedSession(null);
        }}
        session={selectedSession}
      />

      {/* Edit Session Modal */}
      <EditSessionModal
        isOpen={showEditSessionModal}
        onClose={() => {
          setShowEditSessionModal(false);
          setSelectedSession(null);
        }}
        session={selectedSession}
        onUpdateStatus={handleUpdateSessionStatus}
        isLoading={isUpdatingSession}
      />
    </motion.div>
  );
};

export default AdminCounseling;
