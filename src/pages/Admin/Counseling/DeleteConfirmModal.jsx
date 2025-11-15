import React from "react";
import { motion } from "framer-motion";
import { FaTimes, FaExclamationTriangle, FaTrash } from "react-icons/fa";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  counselorName,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-2 sm:mx-4"
      >
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center min-w-0 flex-1">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            </div>
            <div className="ml-2 sm:ml-3 min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Delete Counselor
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            disabled={isLoading}
          >
            <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-600 mb-3">
            Are you sure you want to delete this counselor? This action cannot
            be undone.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-3">
            <div className="flex items-center">
              <FaTrash className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-2 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-red-800 break-words">
                {counselorName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-3 sm:px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xs sm:text-sm"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                Deleting...
              </>
            ) : (
              <>
                <FaTrash className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Delete Counselor
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmModal;
