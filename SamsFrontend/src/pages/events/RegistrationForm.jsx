import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import {
  useGetAllEventsQuery,
  useRegisterEventMutation,
} from "../../redux/api/Events";
import { toast } from "react-hot-toast";
import { accessKey } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  // API hooks
  const { data: eventsData, isLoading, error } = useGetAllEventsQuery();
  const [registerEvent, { isLoading: isRegistering }] =
    useRegisterEventMutation();

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleRegister = async (eventId) => {
    try {
      await registerEvent({ eventId }).unwrap();
      toast.success("Successfully registered for the event!");
    } catch (error) {
      toast.error("Failed to register for the event. Please try again.");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-indigo-200 py-12 px-4 sm:px-6 md:px-10 lg:px-16 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading events...</p>
        </div>
      </motion.section>
    );
  }

  if (error) {
    // Check if user is logged in by checking for token in localStorage
    const isLoggedIn = localStorage.getItem(accessKey);

    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-indigo-200 py-12 px-4 sm:px-6 md:px-10 lg:px-16 flex items-center justify-center"
      >
        <div className="text-center">
          {isLoggedIn ? (
            // User is logged in but there's an error - show actual error
            <>
              <p className="text-lg text-red-600">
                Failed to load events. Please try again later.
              </p>
            </>
          ) : (
            // User is not logged in - show login message
            <>
              <p className="text-gray-600 text-lg mb-2">
                Please login first to view events
              </p>
              <p className="text-gray-500 text-sm mb-4">
                You need to be logged in to access event details
              </p>
              <button
                onClick={() => navigate("/login")}
                className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
              >
                Go to Login
              </button>
            </>
          )}
        </div>
      </motion.section>
    );
  }

  // Extract events from the grouped data structure
  const eventsDataObj = eventsData?.data || {};
  const events = Object.values(eventsDataObj).flat();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-indigo-200 py-12 px-4 sm:px-6 md:px-10 lg:px-16 flex items-start justify-center"
    >
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black tracking-tight">
            Upcoming <span className="text-indigo-600">Events</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Discover exciting opportunities and experiences on campus.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No events available at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const isOpen = expandedId === event._id;
              return (
                <div
                  key={event._id}
                  className="bg-white rounded-xl p-5 sm:p-6 shadow-lg transition-all"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpand(event._id)}
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-700">
                        {event.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mt-1">
                        {formatDate(event.date)} | {event.time}
                      </p>
                    </div>
                    <div className="text-indigo-600">
                      {isOpen ? (
                        <AiOutlineUp size={22} />
                      ) : (
                        <AiOutlineDown size={22} />
                      )}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="text-sm sm:text-base text-gray-800 space-y-2">
                          <p>
                            <strong>Event Date:</strong>{" "}
                            {formatDate(event.date)}
                          </p>
                          <p>
                            <strong>End Date of Registration:</strong>{" "}
                            {formatDate(event.registrationEndDate)}
                          </p>
                          <p>
                            <strong>Organized By:</strong> {event.society_name}
                          </p>
                          <p>
                            <strong>Description:</strong> {event.description}
                          </p>
                          {event.president?.email && (
                            <p className="text-sm text-indigo-600">
                              <strong>For event information, contact:</strong>{" "}
                              <a
                                href={`mailto:${event.president.email}`}
                                className="text-indigo-500 hover:text-indigo-700 underline"
                              >
                                {event.president.email}
                              </a>
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRegister(event._id)}
                          disabled={isRegistering || event.already_registered}
                          className="mt-4 bg-indigo-600 text-white text-sm sm:text-base font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isRegistering
                            ? "Registering..."
                            : event.already_registered
                            ? "Already Registered"
                            : "Participate"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default EventList;
