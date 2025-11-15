import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaExclamationTriangle,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter,
  FaSearch,
  FaDownload,
} from "react-icons/fa";
import {
  useGetAllGrievancesQuery,
  useUpdateGrievanceMutation,
} from "../../../redux/api/Grievance";
import Pagination from "../../../components/Pagination";
import toast from "react-hot-toast";

const AdminGrievances = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [statusForm, setStatusForm] = useState({
    status: "",
    stage: "",
    remarks: "",
  });
  // API call with pagination and filters
  const {
    data: grievancesData,
    isLoading,
    error,
    refetch,
  } = useGetAllGrievancesQuery({
    page: currentPage,
    limit: pageSize || 10,
    status: activeTab !== "all" ? activeTab : undefined,
    search: searchTerm || undefined,
  });

  // Update grievance mutation
  const [updateGrievance, { isLoading: isUpdating }] =
    useUpdateGrievanceMutation();

  // Debug logs to understand the API response structure
  console.log("Full API Response:", grievancesData);
  console.log("Data structure:", grievancesData?.data);
  console.log("Grievances array:", grievancesData?.data);
  console.log("Pagination:", grievancesData?.pagination);

  // Calculate statistics
  const stats = {
    total: grievancesData?.pagination?.totalItems || 0,
    pending:
      grievancesData?.data?.filter((g) => g.status === "Pending").length || 0,
    processing:
      grievancesData?.data?.filter((g) => g.status === "Processing").length ||
      0,
    completed:
      grievancesData?.data?.filter((g) => g.status === "Completed").length || 0,
  };

  const grievances = grievancesData?.data || [];
  const totalItems = grievancesData?.pagination?.totalItems || 0;
  const totalPages = grievancesData?.pagination?.totalPages || 1;

  const handleViewGrievance = (grievance) => {
    setSelectedGrievance(grievance);
    setShowModal(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handleStatusUpdate = (grievance) => {
    setSelectedGrievance(grievance);
    // Set default status based on current status
    const newStatus =
      grievance.status === "Pending" ? "Processing" : "Completed";
    setStatusForm({
      status: newStatus,
      stage: "",
      remarks: "",
    });
    setShowStatusModal(true);
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGrievance) return;

    try {
      const updateData = {
        id: selectedGrievance._id,
        updatedFields: {
          status: statusForm.status,
          stage: statusForm.stage,
          remarks: statusForm.remarks,
        },
      };

      await updateGrievance(updateData).unwrap();
      toast.success(`Status updated to ${statusForm.status}`);
      setShowStatusModal(false);
      setStatusForm({ status: "", stage: "", remarks: "" });
      refetch();
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Update error:", error);
    }
  };

  const handleDelete = (id) => {
    // TODO: Implement delete API call
    toast.success("Grievance deleted successfully");
    refetch();
  };

  // Debug API states
  console.log("Loading state:", isLoading);
  console.log("Error state:", error);
  console.log("Grievances length:", grievances.length);
  console.log("Stats:", stats);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Processing":
        return "text-blue-600 bg-blue-100";
      case "Completed":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaClock className="w-4 h-4" />;
      case "Processing":
        return <FaSpinner className="w-4 h-4" />;
      case "Completed":
        return <FaCheckCircle className="w-4 h-4" />;
      default:
        return <FaExclamationTriangle className="w-4 h-4" />;
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FaExclamationTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">Error loading grievances</p>
          <button
            onClick={() => refetch()}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden p-2 sm:p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-3 sm:mb-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
          Grievances Management
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm">
          Manage and track all student grievances
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-indigo-500 min-h-[80px] sm:min-h-[90px]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-full">
            <div className="min-w-0 flex-1 mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Total Applications
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {stats.total}
              </p>
            </div>
            <div className="p-2 sm:p-2.5 rounded-lg bg-indigo-100 flex-shrink-0 self-end sm:self-auto">
              <FaExclamationTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-yellow-500 min-h-[80px] sm:min-h-[90px]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-full">
            <div className="min-w-0 flex-1 mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Pending
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {stats.pending}
              </p>
            </div>
            <div className="p-2 sm:p-2.5 rounded-lg bg-yellow-100 flex-shrink-0 self-end sm:self-auto">
              <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-blue-500 min-h-[80px] sm:min-h-[90px]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-full">
            <div className="min-w-0 flex-1 mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Processing
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {stats.processing}
              </p>
            </div>
            <div className="p-2 sm:p-2.5 rounded-lg bg-blue-100 flex-shrink-0 self-end sm:self-auto">
              <FaSpinner className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-green-500 min-h-[80px] sm:min-h-[90px]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-full">
            <div className="min-w-0 flex-1 mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Completed
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {stats.completed}
              </p>
            </div>
            <div className="p-2 sm:p-2.5 rounded-lg bg-green-100 flex-shrink-0 self-end sm:self-auto">
              <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      {/* <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, registration, or issue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
              <FaDownload className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div> */}

      {/* Status Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-3 sm:mb-4">
        <div className="border-b border-gray-200">
          <nav
            className="flex space-x-4 sm:space-x-8 px-2 sm:px-4 overflow-x-auto"
            aria-label="Tabs"
          >
            <button
              onClick={() => handleTabChange("all")}
              className={`py-2 sm:py-3 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === "all"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="hidden sm:inline">All Applications</span>
              <span className="sm:hidden">All</span>
              <span className="ml-1 sm:ml-2 bg-gray-100 text-gray-900 py-0.5 px-1.5 sm:px-2.5 rounded-full text-xs">
                {stats.total}
              </span>
            </button>
            <button
              onClick={() => handleTabChange("Pending")}
              className={`py-2 sm:py-3 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === "Pending"
                  ? "border-yellow-500 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Pending
              <span className="ml-1 sm:ml-2 bg-yellow-100 text-yellow-800 py-0.5 px-1.5 sm:px-2.5 rounded-full text-xs">
                {stats.pending}
              </span>
            </button>
            <button
              onClick={() => handleTabChange("Processing")}
              className={`py-2 sm:py-3 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === "Processing"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="hidden sm:inline">Processing</span>
              <span className="sm:hidden">Process</span>
              <span className="ml-1 sm:ml-2 bg-blue-100 text-blue-800 py-0.5 px-1.5 sm:px-2.5 rounded-full text-xs">
                {stats.processing}
              </span>
            </button>
            <button
              onClick={() => handleTabChange("Completed")}
              className={`py-2 sm:py-3 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === "Completed"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="hidden sm:inline">Completed</span>
              <span className="sm:hidden">Done</span>
              <span className="ml-1 sm:ml-2 bg-green-100 text-green-800 py-0.5 px-1.5 sm:px-2.5 rounded-full text-xs">
                {stats.completed}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-3 py-8 text-center">
                    <div className="flex items-center justify-center">
                      <FaSpinner className="w-6 h-6 text-indigo-600 animate-spin mr-2" />
                      <span className="text-sm">Loading grievances...</span>
                    </div>
                  </td>
                </tr>
              ) : grievances.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-3 py-8 text-center text-gray-500 text-sm"
                  >
                    No grievances found
                  </td>
                </tr>
              ) : (
                grievances.map((grievance, index) => (
                  <motion.tr
                    key={grievance._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {grievance.applicant_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {grievance.registration}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-[200px]">
                          {grievance.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 max-w-[300px]">
                      <div className="text-sm text-gray-900 capitalize break-words">
                        {grievance.issue}
                      </div>
                      <div className="text-sm text-gray-500 break-words">
                        {grievance.description}
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          grievance.status
                        )}`}
                      >
                        {getStatusIcon(grievance.status)}
                        <span className="ml-1">{grievance.status}</span>
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(grievance.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewGrievance(grievance)}
                          className="text-indigo-600 hover:text-indigo-900 p-1"
                          title="View Details"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(grievance)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Update Status"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(grievance._id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
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
          <div className="bg-white px-3 py-3 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={pageSize || 10}
              onPageChange={handlePageChange}
              showInfo={true}
            />
          </div>
        )}
      </div>

      {/* Modal for viewing grievance details */}
      {showModal && selectedGrievance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden"
          >
            <div className="p-3 sm:p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Grievance Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg sm:text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-500">
                      Applicant Name
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {selectedGrievance.applicant_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-500">
                      Registration
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {selectedGrievance.registration}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base break-all">
                      {selectedGrievance.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {selectedGrievance.phone_number}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-500">
                      Issue Type
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base capitalize">
                      {selectedGrievance.issue}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-500">
                      Date of Issue
                    </label>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {selectedGrievance.date_of_issue}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-500">
                    Description
                  </label>
                  <p className="text-gray-900 mt-1 text-sm sm:text-base">
                    {selectedGrievance.description}
                  </p>
                </div>

                {selectedGrievance.accused_person &&
                  selectedGrievance.accused_person.length > 0 && (
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">
                        Accused Persons
                      </label>
                      <div className="mt-1 space-y-2">
                        {selectedGrievance.accused_person.map(
                          (person, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-2 sm:p-3 rounded"
                            >
                              <p className="font-medium text-sm sm:text-base">
                                {person.person_name}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600">
                                {person.person_reg}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {selectedGrievance.other_information && (
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-gray-500">
                      Other Information
                    </label>
                    <p className="text-gray-900 mt-1 text-sm sm:text-base">
                      {selectedGrievance.other_information}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-md sm:rounded-lg text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                >
                  Close
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedGrievance)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md sm:rounded-lg hover:bg-indigo-700 text-sm sm:text-base"
                >
                  Update Status
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedGrievance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden"
          >
            <div className="p-3 sm:p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Update Grievance Status
                </h3>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg sm:text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Grievance Details */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-md sm:rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Grievance Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-600">Applicant:</span>
                    <span className="ml-2 font-medium">
                      {selectedGrievance.applicant_name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Registration:</span>
                    <span className="ml-2 font-medium">
                      {selectedGrievance.registration}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Current Status:</span>
                    <span
                      className={`ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedGrievance.status
                      )}`}
                    >
                      {selectedGrievance.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Issue:</span>
                    <span className="ml-2 font-medium capitalize">
                      {selectedGrievance.issue}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Update Form */}
              <form
                onSubmit={handleStatusSubmit}
                className="space-y-3 sm:space-y-4"
              >
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    New Status
                  </label>
                  <select
                    value={statusForm.status}
                    onChange={(e) =>
                      setStatusForm({ ...statusForm, status: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs sm:text-sm"
                    required
                  >
                    <option value="">Select Status</option>
                    {selectedGrievance.status === "Pending" && (
                      <option value="Processing">Processing</option>
                    )}
                    {selectedGrievance.status === "Processing" && (
                      <option value="Completed">Completed</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Stage
                  </label>
                  <input
                    type="text"
                    value={statusForm.stage}
                    onChange={(e) =>
                      setStatusForm({ ...statusForm, stage: e.target.value })
                    }
                    placeholder="Enter current stage (e.g., Investigation, Review, etc.)"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Remarks
                  </label>
                  <textarea
                    value={statusForm.remarks}
                    onChange={(e) =>
                      setStatusForm({ ...statusForm, remarks: e.target.value })
                    }
                    placeholder="Enter remarks or comments about the status update"
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs sm:text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6">
                  <button
                    type="button"
                    onClick={() => setShowStatusModal(false)}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-md sm:rounded-lg text-gray-700 hover:bg-gray-50 text-xs sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md sm:rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    {isUpdating ? (
                      <>
                        <FaSpinner className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Status"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminGrievances;
