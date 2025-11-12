import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaGraduationCap,
  FaUserMd,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaClock as FaClockIcon,
} from "react-icons/fa";

const SessionViewModal = ({ isOpen, onClose, session }) => {
  if (!isOpen || !session) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="w-4 h-4 text-green-500" />;
      case "completed":
        return <FaCheckCircle className="w-4 h-4 text-blue-500" />;
      case "rejected":
        return <FaTimesCircle className="w-4 h-4 text-red-500" />;
      case "pending":
      default:
        return <FaExclamationCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-3 sm:p-6 w-full max-w-2xl mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Counseling Session Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Student Information */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <FaUser className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-600" />
              Student Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <p className="text-xs sm:text-sm text-gray-900 break-words">
                  {session.fullName}
                </p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Registration Number
                </label>
                <p className="text-xs sm:text-sm text-gray-900 break-words">
                  {session.registrationNumber}
                </p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="text-xs sm:text-sm text-gray-900 break-words">
                  {session.email}
                </p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Student ID
                </label>
                <p className="text-xs sm:text-sm text-gray-900 break-words">
                  {session.studentId}
                </p>
              </div>
            </div>
          </div>

          {/* Session Information */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <FaCalendarAlt className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-600" />
              Session Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Counseling Type
                </label>
                <p className="text-xs sm:text-sm text-gray-900 flex items-center">
                  <FaGraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400 flex-shrink-0" />
                  <span className="break-words">{session.counseling_type}</span>
                </p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Counselor
                </label>
                <p className="text-xs sm:text-sm text-gray-900 flex items-center">
                  <FaUserMd className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400 flex-shrink-0" />
                  <span className="break-words">{session.counselor_name}</span>
                </p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Day
                </label>
                <p className="text-xs sm:text-sm text-gray-900 flex items-center">
                  <FaCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400 flex-shrink-0" />
                  <span className="break-words">{session.day}</span>
                </p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Time Slot
                </label>
                <p className="text-xs sm:text-sm text-gray-900 flex items-center">
                  <FaClockIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400 flex-shrink-0" />
                  <span className="break-words">{session.time_slot}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Issue Description */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Issue Description
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 bg-white p-2 sm:p-3 rounded border break-words">
              {session.issue_description}
            </p>
          </div>

          {/* Current Status */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Current Status
            </h4>
            <div className="flex items-center space-x-2 sm:space-x-3">
              {getStatusIcon(session.status)}
              <span
                className={`inline-flex px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full ${getStatusColor(
                  session.status
                )}`}
              >
                {session.status.charAt(0).toUpperCase() +
                  session.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Timestamps
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Created At
                </label>
                <p className="text-xs sm:text-sm text-gray-900 break-words">
                  {formatDate(session.createdAt)}
                </p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Last Updated
                </label>
                <p className="text-xs sm:text-sm text-gray-900 break-words">
                  {formatDate(session.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 sm:mt-6">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 text-xs sm:text-sm"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SessionViewModal;
