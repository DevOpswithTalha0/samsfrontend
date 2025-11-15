import { motion } from "framer-motion";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSubmitGrievanceMutation } from "../../redux/api/Grievance";
import { toast } from "react-hot-toast";
import {
  FaUser,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaFileUpload,
  FaChevronDown,
  FaPlusCircle,
  FaMinusCircle,
} from "react-icons/fa";

const GrievanceForm = () => {
  const [submitGrievance, { isLoading }] = useSubmitGrievanceMutation();
  const { user } = useSelector((state) => state.user);

  // Form state
  const [formData, setFormData] = useState({
    applicant_name: "",
    phone_number: "",
    email: "",
    issue: "",
    date_of_issue: "",
    description: "",
    evidence: "",
    other_information: "",
    batch: "",
    department: "",
    registrationNo: "",
  });

  const [accusedPersons, setAccusedPersons] = useState([
    { person_name: "", person_reg: "" },
  ]);

  // Auto-fill form with user data from Redux
  useEffect(() => {
    if (user) {
      // Parse registration number (format: "sp22-bcs-177")
      let batch = "";
      let department = "";
      let registrationNo = "";

      if (user.registrationNumber) {
        const parts = user.registrationNumber.split("-");
        if (parts.length === 3) {
          batch = parts[0].toLowerCase();
          department = parts[1].toLowerCase();
          registrationNo = parts[2];
        }
      }

      setFormData((prev) => ({
        ...prev,
        // Only auto-fill if field is empty
        applicant_name: prev.applicant_name || user.fullName || "",
        phone_number: prev.phone_number || user.phoneNo || "",
        email: prev.email || user.email || "",
        batch: prev.batch || batch || "sp25",
        department: prev.department || department || "bba",
        registrationNo: prev.registrationNo || registrationNo || "",
      }));
    }
  }, [user]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPerson = () => {
    setAccusedPersons([...accusedPersons, { person_name: "", person_reg: "" }]);
  };

  const handleRemovePerson = (index) => {
    const updatedPersons = accusedPersons.filter((_, i) => i !== index);
    setAccusedPersons(updatedPersons);
  };

  const handleChange = (index, field, value) => {
    const updatedPersons = [...accusedPersons];
    updatedPersons[index][field] = value;
    setAccusedPersons(updatedPersons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data according to API structure
      const grievanceData = {
        registration: `${formData.batch}-${formData.department}-${formData.registrationNo}`,
        applicant_name: formData.applicant_name,
        phone_number: formData.phone_number,
        email: formData.email,
        issue: formData.issue,
        date_of_issue: formData.date_of_issue,
        description: formData.description,
        evidence: formData.evidence,
        accused_person: accusedPersons.filter(
          (person) => person.person_name && person.person_reg
        ),
        other_information: formData.other_information,
      };

      const response = await submitGrievance(grievanceData).unwrap();

      if (response.statusCode === 200) {
        toast.success("Grievance submitted successfully!");
        // Reset form
        setFormData({
          applicant_name: "",
          phone_number: "",
          email: "",
          issue: "",
          date_of_issue: "",
          description: "",
          evidence: "",
          other_information: "",
          batch: "sp25",
          department: "bba",
          registrationNo: "",
        });
        setAccusedPersons([{ person_name: "", person_reg: "" }]);
      }
    } catch (error) {
      console.error("Error submitting grievance:", error);
      toast.error("Failed to submit grievance. Please try again.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center px-4 py-16 mt-10 w-full max-w-7xl mx-auto">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black tracking-tight">
            Submit Your <span className="text-indigo-500">Grievance</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
            Please fill out the form below to report your grievance. We are here
            to help you resolve your issues.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 w-full space-y-8 bg-white p-8 rounded-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Applicant Name */}
            <div className="flex flex-col">
              <label
                htmlFor="applicant_name"
                className="text-base font-semibold text-gray-800 mb-2"
              >
                Applicant Name
              </label>
              <div className="relative">
                <input
                  id="applicant_name"
                  name="applicant_name"
                  type="text"
                  value={formData.applicant_name}
                  onChange={handleFormChange}
                  placeholder="Enter your full name"
                  className="pl-5 pr-10 py-3 text-base bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200 w-full"
                  required
                />
                <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Registration Number */}
            <div className="flex flex-col">
              <label
                htmlFor="registrationNo"
                className="text-base font-semibold text-gray-800 mb-2"
              >
                Registration Number
              </label>
              <div className="flex flex-row space-x-2">
                <select
                  id="batch"
                  name="batch"
                  value={formData.batch || "sp25"}
                  onChange={handleFormChange}
                  className="px-4 py-3 text-base bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200 flex-shrink w-1/3 min-w-[80px]"
                  required
                >
                  <option value="sp25">SP25</option>
                  <option value="fa24">FA24</option>
                  <option value="sp24">SP24</option>
                  <option value="fa23">FA23</option>
                  <option value="sp23">SP23</option>
                  <option value="fa22">FA22</option>
                  <option value="sp22">SP22</option>
                  <option value="fa21">FA21</option>
                  <option value="sp21">SP21</option>
                  <option value="fa20">FA20</option>
                  <option value="sp20">SP20</option>
                </select>
                <select
                  id="department"
                  name="department"
                  value={formData.department || "bba"}
                  onChange={handleFormChange}
                  className="px-4 py-3 text-base bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200 flex-shrink w-1/3 min-w-[100px]"
                  required
                >
                  <option value="bba">BBA</option>
                  <option value="bbc">BBC</option>
                  <option value="bcs">BCS</option>
                  <option value="bee">BEE</option>
                  <option value="ben">BEN</option>
                  <option value="bmd">BMD</option>
                  <option value="bme">BME</option>
                  <option value="bse">BSE</option>
                  <option value="bsi">BSI</option>
                  <option value="bsm">BSM</option>
                  <option value="bty">BTY</option>
                  <option value="bcv">BCV</option>
                  <option value="fsn">FSN</option>
                  <option value="pcs">PCS</option>
                  <option value="pmi">PMI</option>
                  <option value="pms">PMS</option>
                  <option value="pmt">PMT</option>
                  <option value="rbs">RBS</option>
                  <option value="rcs">RCS</option>
                  <option value="rms">RMS</option>
                  <option value="rmt">RMT</option>
                </select>
                <div className="relative flex-shrink w-1/3 min-w-[110px]">
                  <input
                    id="registrationNo"
                    name="registrationNo"
                    type="text"
                    value={formData.registrationNo || ""}
                    onChange={handleFormChange}
                    placeholder="Roll No"
                    className="pl-5 pr-10 py-3 text-base bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200 w-full"
                    required
                  />
                  <FaIdCard className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label
                htmlFor="phone_number"
                className="text-base font-semibold text-gray-800 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={handleFormChange}
                  placeholder="Enter your phone number"
                  className="pl-5 pr-10 py-3 text-base bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200 w-full"
                  required
                />
                <FaPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* University Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-base font-semibold text-gray-800 mb-2"
              >
                University Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Enter your university email"
                  className="pl-5 pr-10 py-3 text-base bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200 w-full"
                  required
                />
                <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Issue Type */}
            <div className="flex flex-col">
              <label
                htmlFor="issue"
                className="text-base font-semibold text-gray-800 mb-2"
              >
                Issue Type
              </label>
              <div className="relative">
                <select
                  id="issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleFormChange}
                  className="pl-5 pr-10 py-3 text-base bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200 w-full appearance-none"
                  required
                >
                  <option value="">Select issue type</option>
                  <option value="harassment">Harassment</option>
                  <option value="misconduct">Misconduct</option>
                  <option value="illegalActivity">Illegal Activity</option>
                  <option value="quarrel">Quarrel</option>
                  <option value="physicalAbuse">Physical Abuse</option>
                  <option value="others">Others</option>
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Date of Issue */}
            <div className="flex flex-col">
              <label
                htmlFor="date_of_issue"
                className="text-base font-semibold text-gray-800 mb-2"
              >
                Date of Issue
              </label>
              <input
                id="date_of_issue"
                name="date_of_issue"
                type="date"
                value={formData.date_of_issue}
                onChange={handleFormChange}
                className="pl-5 pr-5 py-3 text-base bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200 w-full"
                required
              />
            </div>

            {/* Issue Description */}
            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="description"
                className="text-base font-semibold text-gray-800 mb-2"
              >
                Description of the Issue
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Describe your issue in detail..."
                className="px-5 py-3 text-base bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200 w-full"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="evidence"
                className="text-base font-semibold text-gray-800 mb-2"
              >
                Evidence (Optional)
              </label>
              <div className="relative">
                <input
                  id="evidence"
                  name="evidence"
                  type="text"
                  value={formData.evidence}
                  onChange={handleFormChange}
                  placeholder="Enter evidence URL or description"
                  className="pl-5 pr-10 py-3 text-base bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200 w-full"
                />
                <FaFileUpload className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                You can provide evidence URL or description.
              </p>
            </div>

            <div className="flex flex-col">
              {accusedPersons.map((person, index) => (
                <div key={index} className="mb-4 border-b pb-4">
                  <div className="flex flex-col">
                    <label className="text-base font-semibold text-gray-800 mb-2">
                      Accused Person Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter accused person's name"
                        className="pl-10 pr-12 py-3 text-base bg-gray-50 rounded-lg border border-gray-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-300 w-full"
                        value={person.person_name}
                        onChange={(e) =>
                          handleChange(index, "person_name", e.target.value)
                        }
                      />
                      <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex flex-col mt-4">
                    <label className="text-base font-semibold text-gray-800 mb-2">
                      Accused Person Reg. No
                    </label>
                    <input
                      type="text"
                      placeholder="Enter registration number (e.g., SP22-BCS-177)"
                      className="pl-10 pr-12 py-3 text-base bg-gray-50 rounded-lg border border-gray-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-300 w-full"
                      value={person.person_reg}
                      onChange={(e) =>
                        handleChange(index, "person_reg", e.target.value)
                      }
                    />
                  </div>

                  {index > 0 && (
                    <button
                      type="button"
                      className="mt-2 text-red-600 hover:text-red-800 flex items-center"
                      onClick={() => handleRemovePerson(index)}
                    >
                      <FaMinusCircle className="w-6 h-6 mr-2" /> Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800"
                onClick={handleAddPerson}
              >
                <FaPlusCircle className="w-6 h-6 mr-2" /> Add Another Person
              </button>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="other_information"
                className="text-base font-semibold text-gray-800 mb-2"
              >
                Any Other Information (Optional)
              </label>
              <textarea
                id="other_information"
                name="other_information"
                value={formData.other_information}
                onChange={handleFormChange}
                placeholder="Provide any additional information..."
                className="px-5 py-3 text-base bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200 w-full"
                rows="3"
              ></textarea>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3 sm:gap-4 mb-6">
            <input
              id="agreement"
              name="agreement"
              type="checkbox"
              className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 border-2 border-gray-300 rounded-lg focus:ring-indigo-700 cursor-pointer"
              required
            />
            <label
              htmlFor="agreement"
              className="text-base sm:text-lg text-gray-700"
            >
              I confirm that all the information provided is correct.
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-base font-semibold text-white bg-indigo-500 rounded-xl hover:bg-indigo-700 hover:cursor-pointer focus:ring-4 focus:ring-indigo-300 transition-all sm:py-3 sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Submit Grievance"}
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default GrievanceForm;
