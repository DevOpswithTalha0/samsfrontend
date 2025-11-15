import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaIdCard } from "react-icons/fa";
import {
  useGetAllCounselingDetailsQuery,
  useRegisterCounselorMutation,
} from "../../redux/api/Counseling";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { accessKey } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [type, setType] = useState("");
  const [counselor, setCounselor] = useState("");
  const [day, setDay] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [availableCounselors, setAvailableCounselors] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedCounselorId, setSelectedCounselorId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields state
  const [fullName, setFullName] = useState("");
  const [batch, setBatch] = useState("");
  const [department, setDepartment] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");

  // Get user data from Redux store
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // API hooks
  const {
    data: counselingData,
    isLoading,
    error,
  } = useGetAllCounselingDetailsQuery();
  const [registerCounselor, { isLoading: isRegistering }] =
    useRegisterCounselorMutation();

  // Auto-fill form with user data from Redux
  useEffect(() => {
    if (user) {
      // Parse registration number (format: "sp22-bcs-177")
      let parsedBatch = "";
      let parsedDepartment = "";
      let parsedRegistrationNo = "";

      if (user.registrationNumber) {
        const parts = user.registrationNumber.split("-");
        if (parts.length === 3) {
          parsedBatch = parts[0].toLowerCase();
          parsedDepartment = parts[1].toLowerCase();
          parsedRegistrationNo = parts[2];
        }
      }

      // Only auto-fill if field is empty
      setFullName((prev) => prev || user.fullName || "");
      setBatch((prev) => prev || parsedBatch);
      setDepartment((prev) => prev || parsedDepartment);
      setRegistrationNo((prev) => prev || parsedRegistrationNo);
    }
  }, [user]);

  // Handle counseling data
  useEffect(() => {
    if (counselingData?.data && type) {
      const typeData = counselingData.data[type];
      if (typeData?.counselors) {
        setAvailableCounselors(typeData.counselors);
        setCounselor("");
        setDay("");
        setTimeSlot("");
        setAvailableSlots([]);
        setSelectedCounselorId("");
      }
    }
  }, [counselingData, type]);

  // Handle counselor selection
  useEffect(() => {
    const selected = availableCounselors.find((c) => c.name === counselor);
    if (selected) {
      setSelectedCounselorId(selected._id);
      setAvailableDays(Object.keys(selected.schedule));
      setDay("");
      setTimeSlot("");
      setAvailableSlots([]);
    }
  }, [counselor, availableCounselors]);

  // Handle day selection
  useEffect(() => {
    const selected = availableCounselors.find((c) => c.name === counselor);
    if (selected && day) {
      setAvailableSlots(selected.schedule[day] || []);
      setTimeSlot("");
    }
  }, [day, counselor, availableCounselors]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book a counseling session");
      return;
    }

    const formData = new FormData(e.target);

    const requestData = {
      fullName: fullName,
      registrationNumber: `${batch}-${department}-${registrationNo}`,
      email: user.email,
      counseling_type: type,
      counselor_name: counselor,
      counselor_id: selectedCounselorId,
      day: day,
      time_slot: timeSlot,
      issue_description: formData.get("description"),
    };

    try {
      setIsSubmitting(true);
      const response = await registerCounselor(requestData).unwrap();

      if (response.success) {
        toast.success("Counseling session booked successfully!");

        // Reset form
        e.target.reset();
        setType("");
        setCounselor("");
        setDay("");
        setTimeSlot("");
        setAvailableCounselors([]);
        setAvailableDays([]);
        setAvailableSlots([]);
        setSelectedCounselorId("");
        // Reset form fields but keep auto-filled values if user data exists
        if (user) {
          // Parse registration number again for reset
          let parsedBatch = "";
          let parsedDepartment = "";
          let parsedRegistrationNo = "";
          if (user.registrationNumber) {
            const parts = user.registrationNumber.split("-");
            if (parts.length === 3) {
              parsedBatch = parts[0].toLowerCase();
              parsedDepartment = parts[1].toLowerCase();
              parsedRegistrationNo = parts[2];
            }
          }
          setFullName(user.fullName || "");
          setBatch(parsedBatch);
          setDepartment(parsedDepartment);
          setRegistrationNo(parsedRegistrationNo);
        } else {
          setFullName("");
          setBatch("");
          setDepartment("");
          setRegistrationNo("");
        }
      } else {
        toast.error(response.message || "Failed to book counseling session");
      }
    } catch (error) {
      console.error("Error booking counseling session:", error);
      toast.error(error?.data?.message || "Failed to book counseling session");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get available counseling types
  const availableTypes = counselingData?.data
    ? Object.keys(counselingData.data)
    : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    // Check if user is logged in by checking for token in localStorage
    const isLoggedIn = localStorage.getItem(accessKey);

    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          {isLoggedIn ? (
            // User is logged in but there's an error - show actual error
            <>
              <p className="text-red-600 text-lg">
                Failed to load counseling data
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Retry
              </button>
            </>
          ) : (
            // User is not logged in - show login message
            <>
              <p className="text-gray-600 text-lg mb-2">
                Please login first to access counseling services
              </p>
              <p className="text-gray-500 text-sm mb-4">
                You need to be logged in to view counseling details
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
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col items-center px-4 py-16 mt-10 w-full max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black tracking-tight">
            Book Your{" "}
            <span className="text-indigo-600">Counseling Session</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Take the first step towards your future. Fill out the form below to
            schedule your personalized counseling session.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 w-full space-y-8 bg-white p-6 md:p-8 rounded-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              id="name"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <div className="flex flex-col">
              <label
                htmlFor="registrationNo"
                className="text-base font-semibold text-gray-800 mb-2"
              >
                Registration Number
              </label>
              <div className="flex flex-wrap gap-3 md:gap-4 w-full">
                <select
                  id="batch"
                  name="batch"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="flex-1 min-w-[90px] px-3 py-3 text-base bg-gray-50 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
                  required
                >
                  <option value="">Batch</option>
                  {[
                    "sp25",
                    "fa24",
                    "sp24",
                    "fa23",
                    "sp23",
                    "fa22",
                    "sp22",
                    "fa21",
                    "sp21",
                    "fa20",
                    "sp20",
                  ].map((b) => (
                    <option key={b} value={b.toLowerCase()}>
                      {b.toUpperCase()}
                    </option>
                  ))}
                </select>

                <select
                  id="department"
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="flex-1 min-w-[90px] px-3 py-3 text-base bg-gray-50 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
                  required
                >
                  <option value="">Dept</option>
                  {[
                    "bba",
                    "bbc",
                    "bcs",
                    "bee",
                    "ben",
                    "bmd",
                    "bme",
                    "bse",
                    "bsi",
                    "bsm",
                    "bty",
                    "bcv",
                    "fsn",
                    "pcs",
                    "pmi",
                    "pms",
                    "pmt",
                    "rbs",
                    "rcs",
                    "rms",
                    "rmt",
                  ].map((d) => (
                    <option key={d} value={d}>
                      {d.toUpperCase()}
                    </option>
                  ))}
                </select>

                <div className="relative flex-1 min-w-[90px]">
                  <input
                    id="registrationNo"
                    name="registrationNo"
                    type="text"
                    value={registrationNo}
                    onChange={(e) => setRegistrationNo(e.target.value)}
                    placeholder="Roll No"
                    className="w-full px-3 py-3 text-base bg-gray-50 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 pr-10"
                    required
                  />
                  <FaIdCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <Dropdown
              label="Counseling Type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={availableTypes}
              defaultOption="Select counseling type"
            />

            <Dropdown
              label="Counselor Name"
              id="counselor"
              value={counselor}
              onChange={(e) => setCounselor(e.target.value)}
              options={availableCounselors.map((c) => c.name)}
              defaultOption="Select counselor"
              disabled={!type}
            />

            <Dropdown
              label="Day"
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              options={availableDays}
              defaultOption="Select available day"
              disabled={!counselor}
            />

            <Dropdown
              label="Time Slot"
              id="slot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              options={availableSlots}
              defaultOption="Select time slot"
              disabled={!day}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-base font-semibold text-gray-800 mb-2"
            >
              Issue Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Please describe your concerns..."
              className="px-4 py-3 text-base bg-gray-50 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
              required
            ></textarea>
          </div>

          <div className="flex items-center">
            <input
              id="agreement"
              type="checkbox"
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded-md focus:ring-indigo-600"
              required
            />
            <label htmlFor="agreement" className="ml-3 text-base text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isRegistering}
            className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || isRegistering ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Booking Session...
              </span>
            ) : (
              "Schedule Counseling Session"
            )}
          </button>
        </form>
      </div>
    </motion.section>
  );
};

const Input = ({ label, id, type = "text", placeholder, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-base font-semibold text-gray-800 mb-2">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-4 py-3 text-base bg-gray-50 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
      required
    />
  </div>
);

const Dropdown = ({
  label,
  id,
  value,
  onChange,
  options = [],
  defaultOption,
  disabled = false,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-base font-semibold text-gray-800 mb-2">
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="px-4 py-3 text-base bg-gray-50 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
      required
      disabled={disabled}
    >
      <option value="">{defaultOption}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default RegistrationForm;
