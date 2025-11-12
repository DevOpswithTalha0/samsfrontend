import React from "react";
import { motion } from "framer-motion";
import { FaTimes, FaSave } from "react-icons/fa";

const EditCounselorModal = ({
  isOpen,
  onClose,
  counselorForm,
  setCounselorForm,
  onSubmit,
  daysOfWeek,
  counselorTypes,
  addTimeSlot,
  removeTimeSlot,
  updateTimeSlot,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-3 sm:p-6 w-full max-w-2xl mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Edit Counselor
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Counselor Name
            </label>
            <input
              type="text"
              value={counselorForm.name}
              onChange={(e) =>
                setCounselorForm({ ...counselorForm, name: e.target.value })
              }
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs sm:text-sm"
              placeholder="Enter counselor name"
            />
          </div>

          {/* Type Field */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Counselor Type
            </label>
            <select
              value={counselorForm.type}
              onChange={(e) =>
                setCounselorForm({ ...counselorForm, type: e.target.value })
              }
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs sm:text-sm"
            >
              {counselorTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Schedule Section */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Schedule
            </label>
            <div className="space-y-2 sm:space-y-3 max-h-60 sm:max-h-80 overflow-y-auto">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="border border-gray-200 rounded-lg p-2 sm:p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {day}
                    </span>
                    <button
                      onClick={() => addTimeSlot(day)}
                      className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm"
                    >
                      + Add Time Slot
                    </button>
                  </div>
                  {counselorForm.schedule[day]?.map((time, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="text"
                        value={time}
                        onChange={(e) =>
                          updateTimeSlot(day, index, e.target.value)
                        }
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm"
                        placeholder="e.g., 9:00 AM - 10:00 AM"
                      />
                      <button
                        onClick={() => removeTimeSlot(day, index)}
                        className="text-red-600 hover:text-red-800 flex-shrink-0"
                      >
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 text-xs sm:text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center text-xs sm:text-sm"
          >
            <FaSave className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Update Counselor
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditCounselorModal;
