import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaEye,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaImage,
} from "react-icons/fa";
import {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "../../../redux/api/Events";
import Pagination from "../../../components/Pagination";
import toast from "react-hot-toast";

const AdminEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // API hooks with pagination
  const {
    data: eventsData,
    isLoading,
    error,
    refetch,
  } = useGetAllEventsQuery({
    page: currentPage,
    limit: pageSize,
    search: searchTerm,
    date: filterDate !== "all" ? filterDate : undefined,
  });
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    registrationEndDate: "",
    speaker: "",
    society_name: "",
    bgColor: "bg-blue-100",
    president: {
      name: "",
      email: "",
      contact: "",
    },
  });

  // Flatten events data for easier handling
  const allEvents = eventsData?.data
    ? Object.values(eventsData.data).flat()
    : [];

  // Pagination data from API response
  const pagination = eventsData?.pagination || {
    totalItems: 0,
    pageSize: 10,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  // Function to format time from 24h to 12h AM/PM format
  const formatTimeTo12Hour = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Function to combine start and end times
  const combineTimes = (startTime, endTime) => {
    if (!startTime || !endTime) return "";
    const startFormatted = formatTimeTo12Hour(startTime);
    const endFormatted = formatTimeTo12Hour(endTime);
    return `${startFormatted} - ${endFormatted}`;
  };

  // Function to parse existing time string back to start and end times
  const parseTimeString = (timeString) => {
    if (!timeString) return { startTime: "", endTime: "" };
    const parts = timeString.split(" - ");
    if (parts.length !== 2) return { startTime: "", endTime: "" };

    const startTime = convert12To24Hour(parts[0].trim());
    const endTime = convert12To24Hour(parts[1].trim());
    return { startTime, endTime };
  };

  // Function to convert 12h to 24h format
  const convert12To24Hour = (time12) => {
    if (!time12) return "";
    const [time, period] = time12.split(" ");
    const [hours, minutes] = time.split(":");
    let hour24 = parseInt(hours, 10);

    if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    } else if (period === "PM" && hour24 !== 12) {
      hour24 += 12;
    }

    return `${hour24.toString().padStart(2, "0")}:${minutes}`;
  };

  // Since we're now using server-side filtering and pagination,
  // we don't need client-side filtering anymore
  const filteredEvents = allEvents;

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterDate]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      // Combine start and end times into the required format
      const eventData = {
        ...newEvent,
        time: combineTimes(newEvent.startTime, newEvent.endTime),
      };
      // Remove startTime and endTime from the data sent to API
      delete eventData.startTime;
      delete eventData.endTime;

      await createEvent(eventData).unwrap();
      toast.success("Event created successfully!");
      setShowCreateModal(false);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        registrationEndDate: "",
        speaker: "",
        society_name: "",
        bgColor: "bg-blue-100",
        president: {
          name: "",
          email: "",
          contact: "",
        },
      });
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(error.data?.message || "Failed to create event");
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    // Parse the existing time string into start and end times
    const { startTime, endTime } = parseTimeString(event.time);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      startTime: startTime,
      endTime: endTime,
      registrationEndDate: event.registrationEndDate,
      speaker: event.speaker,
      society_name: event.society_name,
      bgColor: event.bgColor,
      president: {
        name: event.president.name,
        email: event.president.email,
        contact: event.president.contact,
      },
    });
    setShowEditModal(true);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    // Debug logging
    console.log("editingEvent:", editingEvent);
    console.log("newEvent:", newEvent);

    // Check if editingEvent exists and has an _id
    if (!editingEvent || !editingEvent._id) {
      console.error("editingEvent is undefined or missing _id:", editingEvent);
      toast.error("No event selected for editing");
      return;
    }

    try {
      // Combine start and end times into the required format
      const eventData = {
        ...newEvent,
        time: combineTimes(newEvent.startTime, newEvent.endTime),
      };
      // Remove startTime and endTime from the data sent to API
      delete eventData.startTime;
      delete eventData.endTime;

      console.log("Sending update data:", {
        id: editingEvent._id,
        updateData: eventData,
      });

      // Based on your API structure, send the data in the correct format
      await updateEvent({
        id: editingEvent._id,
        updateData: eventData,
      }).unwrap();

      setShowEditModal(false);
      setEditingEvent(null);
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error(error.data?.message || "Failed to update event");
    }
  };

  const handleDeleteEvent = (event) => {
    setDeletingEvent(event);
    setShowDeleteModal(true);
  };

  const confirmDeleteEvent = async () => {
    if (deletingEvent) {
      try {
        await deleteEvent(deletingEvent._id).unwrap();
        setShowDeleteModal(false);
        setDeletingEvent(null);
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error(error.data?.message || "Failed to delete event");
      }
    }
  };

  const cancelDeleteEvent = () => {
    setShowDeleteModal(false);
    setDeletingEvent(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getUniqueDates = () => {
    const dates = [...new Set(allEvents.map((event) => event.date))];
    return dates.sort();
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
      className="space-y-3 xs:space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4"
      >
        <div>
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Events Management
          </h1>
          <p className="text-gray-600 mt-1 text-xs xs:text-sm sm:text-base">
            Manage and organize all university events
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-md xs:rounded-lg transition-colors text-xs xs:text-sm sm:text-base"
        >
          <FaPlus className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
          <span>Create Event</span>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={cardVariants}
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6"
      >
        {[
          {
            title: "Total Events",
            value: allEvents.length,
            color: "blue",
            icon: FaCalendarAlt,
          },
          {
            title: "This Month",
            value: allEvents.filter((e) => {
              const eventDate = new Date(e.date);
              const now = new Date();
              return (
                eventDate.getMonth() === now.getMonth() &&
                eventDate.getFullYear() === now.getFullYear()
              );
            }).length,
            color: "green",
            icon: FaCheckCircle,
          },
          {
            title: "Upcoming",
            value: allEvents.filter((e) => new Date(e.date) > new Date())
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
              className={`bg-${stat.color}-50 rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-6 shadow-sm border border-${stat.color}-100`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-xs xs:text-sm mt-1">
                    {stat.title}
                  </p>
                </div>
                <div
                  className={`p-1.5 xs:p-2 sm:p-3 rounded-md xs:rounded-lg bg-${stat.color}-100`}
                >
                  <Icon
                    className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-${stat.color}-500`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-6 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-2.5 xs:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 xs:pl-9 sm:pl-10 pr-3 xs:pr-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm sm:text-base"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaFilter className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-400" />
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm sm:text-base"
            >
              <option value="all">All Dates</option>
              {getUniqueDates().map((date) => (
                <option key={date} value={date}>
                  {formatDate(date)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Events List */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-3 xs:p-4 sm:p-6">
          {isLoading ? (
            <div className="text-center py-8 xs:py-10 sm:py-12">
              <div className="animate-spin rounded-full h-8 xs:h-10 sm:h-12 w-8 xs:w-10 sm:w-12 border-b-2 border-indigo-500 mx-auto mb-3 xs:mb-4"></div>
              <p className="text-gray-500 text-xs xs:text-sm">
                Loading events...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-8 xs:py-10 sm:py-12">
              <FaTimesCircle className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 text-red-300 mx-auto mb-3 xs:mb-4" />
              <h3 className="text-base xs:text-lg font-medium text-gray-900 mb-2">
                Error loading events
              </h3>
              <p className="text-gray-500 mb-4 xs:mb-6 text-xs xs:text-sm">
                {error.data?.message || "Something went wrong"}
              </p>
              <button
                onClick={() => refetch()}
                className="inline-flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 xs:px-6 py-2 xs:py-3 rounded-md xs:rounded-lg transition-colors text-xs xs:text-sm"
              >
                <FaClock className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                <span>Retry</span>
              </button>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-8 xs:py-10 sm:py-12">
              <FaCalendarAlt className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 text-gray-300 mx-auto mb-3 xs:mb-4" />
              <h3 className="text-base xs:text-lg font-medium text-gray-900 mb-2">
                {allEvents.length === 0 ? "No events yet" : "No events found"}
              </h3>
              <p className="text-gray-500 mb-4 xs:mb-6 text-xs xs:text-sm">
                {allEvents.length === 0
                  ? "Get started by creating your first event"
                  : "No events match your current filters"}
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 xs:px-6 py-2 xs:py-3 rounded-md xs:rounded-lg transition-colors text-xs xs:text-sm"
              >
                <FaPlus className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                <span>Create Event</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3 xs:space-y-4">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-md xs:rounded-lg p-3 xs:p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 xs:gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base xs:text-lg font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <div className="flex items-center space-x-1 xs:space-x-2">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="p-1.5 xs:p-2 text-indigo-500 hover:bg-indigo-50 rounded-md xs:rounded-lg transition-colors"
                            title="Edit Event"
                          >
                            <FaEdit className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event)}
                            className="p-1.5 xs:p-2 text-red-500 hover:bg-red-50 rounded-md xs:rounded-lg transition-colors"
                            title="Delete Event"
                            disabled={isDeleting}
                          >
                            <FaTrash className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-600 text-xs xs:text-sm mb-3 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 text-xs xs:text-sm">
                        <div className="flex items-center text-gray-600">
                          <FaCalendarAlt className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-1.5 xs:mr-2 text-indigo-500" />
                          <span className="truncate">
                            {formatDate(event.date)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaClock className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-1.5 xs:mr-2 text-indigo-500" />
                          <span className="truncate">{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaBuilding className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-1.5 xs:mr-2 text-indigo-500" />
                          <span className="truncate">{event.society_name}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaUser className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-1.5 xs:mr-2 text-indigo-500" />
                          <span className="truncate">
                            {event.speaker || "TBA"}
                          </span>
                        </div>
                      </div>

                      {event.president && (
                        <div className="mt-3 p-2.5 xs:p-3 bg-gray-50 rounded-md xs:rounded-lg">
                          <h4 className="text-xs xs:text-sm font-medium text-gray-700 mb-2">
                            Event President
                          </h4>
                          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 text-xs xs:text-sm">
                            <div className="flex items-center text-gray-600">
                              <FaUser className="w-3 h-3 mr-1.5 xs:mr-2" />
                              <span className="truncate">
                                {event.president.name}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FaEnvelope className="w-3 h-3 mr-1.5 xs:mr-2" />
                              <span className="truncate">
                                {event.president.email}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FaPhone className="w-3 h-3 mr-1.5 xs:mr-2" />
                              <span className="truncate">
                                {event.president.contact}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredEvents.length > 0 && (
          <div className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 border-t border-gray-200">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.pageSize}
              onPageChange={handlePageChange}
              showInfo={true}
              className=""
            />
          </div>
        )}
      </motion.div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-2 xs:p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-6 w-full max-w-2xl max-h-[95vh] xs:max-h-[90vh] overflow-y-auto mx-2 xs:mx-4"
          >
            <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-6">
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
                Create New Event
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimesCircle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <form
              onSubmit={handleCreateEvent}
              className="space-y-3 xs:space-y-4"
            >
              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Society Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEvent.society_name}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, society_name: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                    placeholder="Enter society name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                  placeholder="Enter event description"
                />
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Registration End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newEvent.registrationEndDate}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        registrationEndDate: e.target.value,
                      })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={newEvent.startTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startTime: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    End Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={newEvent.endTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endTime: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Speaker
                  </label>
                  <input
                    type="text"
                    value={newEvent.speaker}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, speaker: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                    placeholder="Enter speaker name (optional)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-1 gap-3 xs:gap-4">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Background Color
                  </label>
                  <select
                    value={newEvent.bgColor}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, bgColor: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                  >
                    <option value="bg-blue-100">Blue</option>
                    <option value="bg-green-100">Green</option>
                    <option value="bg-orange-100">Orange</option>
                    <option value="bg-purple-100">Purple</option>
                    <option value="bg-red-100">Red</option>
                    <option value="bg-yellow-100">Yellow</option>
                  </select>
                </div>
              </div>

              {/* President Details */}
              <div className="border-t pt-3 xs:pt-4">
                <h3 className="text-base xs:text-lg font-medium text-gray-700 mb-3 xs:mb-4">
                  President Details
                </h3>
                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4">
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                      President Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newEvent.president.name}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          president: {
                            ...newEvent.president,
                            name: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                      placeholder="Enter president name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                      President Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={newEvent.president.email}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          president: {
                            ...newEvent.president,
                            email: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                      placeholder="Enter president email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                      President Contact *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newEvent.president.contact}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          president: {
                            ...newEvent.president,
                            contact: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                      placeholder="Enter president contact"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row justify-end space-y-2 xs:space-y-0 xs:space-x-3 sm:space-x-4 pt-4 xs:pt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-full xs:w-auto px-4 xs:px-6 py-2 xs:py-3 border border-gray-200 text-gray-700 rounded-md xs:rounded-lg hover:bg-gray-50 transition-colors text-xs xs:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="w-full xs:w-auto px-4 xs:px-6 py-2 xs:py-3 bg-indigo-500 text-white rounded-md xs:rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 text-xs xs:text-sm"
                >
                  {isCreating ? "Creating..." : "Create Event"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Event Modal */}
      {showEditModal && editingEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-2 xs:p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-6 w-full max-w-2xl max-h-[95vh] xs:max-h-[90vh] overflow-y-auto mx-2 xs:mx-4"
          >
            <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-6">
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
                Edit Event
              </h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingEvent(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimesCircle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <form
              onSubmit={handleUpdateEvent}
              className="space-y-3 xs:space-y-4"
            >
              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Society Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEvent.society_name}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, society_name: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                    placeholder="Enter society name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                  placeholder="Enter event description"
                />
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Registration End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newEvent.registrationEndDate}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        registrationEndDate: e.target.value,
                      })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={newEvent.startTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startTime: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    End Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={newEvent.endTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endTime: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Speaker
                  </label>
                  <input
                    type="text"
                    value={newEvent.speaker}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, speaker: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                    placeholder="Enter speaker name (optional)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-1 gap-3 xs:gap-4">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                    Background Color
                  </label>
                  <select
                    value={newEvent.bgColor}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, bgColor: e.target.value })
                    }
                    className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                  >
                    <option value="bg-blue-100">Blue</option>
                    <option value="bg-green-100">Green</option>
                    <option value="bg-orange-100">Orange</option>
                    <option value="bg-purple-100">Purple</option>
                    <option value="bg-red-100">Red</option>
                    <option value="bg-yellow-100">Yellow</option>
                  </select>
                </div>
              </div>

              {/* President Details */}
              <div className="border-t pt-3 xs:pt-4">
                <h3 className="text-base xs:text-lg font-medium text-gray-700 mb-3 xs:mb-4">
                  President Details
                </h3>
                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4">
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                      President Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newEvent.president.name}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          president: {
                            ...newEvent.president,
                            name: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                      placeholder="Enter president name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                      President Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={newEvent.president.email}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          president: {
                            ...newEvent.president,
                            email: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                      placeholder="Enter president email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">
                      President Contact *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newEvent.president.contact}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          president: {
                            ...newEvent.president,
                            contact: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-md xs:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs xs:text-sm"
                      placeholder="Enter president contact"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row justify-end space-y-2 xs:space-y-0 xs:space-x-3 sm:space-x-4 pt-4 xs:pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingEvent(null);
                  }}
                  className="w-full xs:w-auto px-4 xs:px-6 py-2 xs:py-3 border border-gray-200 text-gray-700 rounded-md xs:rounded-lg hover:bg-gray-50 transition-colors text-xs xs:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full xs:w-auto px-4 xs:px-6 py-2 xs:py-3 bg-indigo-500 text-white rounded-md xs:rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 text-xs xs:text-sm"
                >
                  {isUpdating ? "Updating..." : "Update Event"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-2 xs:p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg xs:rounded-xl p-4 xs:p-6 w-full max-w-md mx-2 xs:mx-4"
          >
            <div className="flex items-center justify-center mb-3 xs:mb-4">
              <div className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 bg-red-100 rounded-full flex items-center justify-center">
                <FaTrash className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 text-red-500" />
              </div>
            </div>

            <div className="text-center mb-4 xs:mb-6">
              <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-2">
                Delete Event
              </h2>
              <p className="text-gray-600 mb-3 xs:mb-4 text-xs xs:text-sm">
                Are you sure you want to delete this event? This action cannot
                be undone.
              </p>
              {deletingEvent && (
                <div className="bg-gray-50 rounded-md xs:rounded-lg p-3 xs:p-4 text-left">
                  <h3 className="font-medium text-gray-900 mb-1 text-xs xs:text-sm">
                    {deletingEvent.title}
                  </h3>
                  <p className="text-xs xs:text-sm text-gray-600">
                    {deletingEvent.society_name} •{" "}
                    {formatDate(deletingEvent.date)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col xs:flex-row justify-end space-y-2 xs:space-y-0 xs:space-x-3 sm:space-x-4">
              <button
                onClick={cancelDeleteEvent}
                className="w-full xs:w-auto px-4 xs:px-6 py-2 xs:py-3 border border-gray-200 text-gray-700 rounded-md xs:rounded-lg hover:bg-gray-50 transition-colors text-xs xs:text-sm"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteEvent}
                disabled={isDeleting}
                className="w-full xs:w-auto px-4 xs:px-6 py-2 xs:py-3 bg-red-500 text-white rounded-md xs:rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 text-xs xs:text-sm"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-3.5 xs:h-4 w-3.5 xs:w-4 border-b-2 border-white"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <FaTrash className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
                    <span>Delete Event</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminEvents;
