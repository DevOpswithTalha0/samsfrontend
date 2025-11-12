import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetUserQuery,
  useUpdateUserDetailsMutation,
  useChangePasswordMutation,
} from "../../redux/api/Auth";

const Profile = () => {
  const { data, isLoading, refetch, error } = useGetUserQuery();
  const userData = data?.data || {};

  console.log("Profile component - API response:", { data, isLoading, error });

  useEffect(() => {
    console.log("Profile component mounted");
    return () => {
      console.log("Profile component unmounted");
    };
  }, []);

  const [updateUserDetails, { isLoading: isUpdatingProfile }] =
    useUpdateUserDetailsMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const [detailsForm, setDetailsForm] = useState({
    fullName: "",
    phoneNo: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    console.log("User data received:", userData);
    if (userData) {
      setDetailsForm({
        fullName: userData.fullName || "",
        phoneNo: userData.phoneNo || "",
      });
    }
  }, [userData]);

  const handleDetailChange = (e) => {
    const { id, value } = e.target;
    console.log("Form field changed:", id, value);
    setDetailsForm((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", detailsForm);
    try {
      const res = await updateUserDetails(detailsForm).unwrap();
      console.log("Update response:", res);
      if (res?.statusCode === 200) {
        toast.success("Profile update hogaya successfully");
        refetch();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Profile update nahi ho saka");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordForm;

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Saare password fields required hain");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password kam az kam 8 characters ka hona chahiye");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords match nahi kar rahe");
      return;
    }

    try {
      const res = await changePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      if (res?.statusCode === 200) {
        toast.success("Password successfully change hogaya");
        setPasswordForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.error("Password change nahi ho saka");
    }
  };

  if (isLoading) {
    console.log("Profile page is loading...");
    return <p className="text-center mt-20">Loading Profile...</p>;
  }

  if (error) {
    console.error("Profile page error:", error);
    return (
      <p className="text-center mt-20 text-red-500">
        Error loading profile: {error.message}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 py-16 px-4 sm:px-6 lg:px-12 mt-16">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
        {/* Update Profile Card */}
        <div className="bg-white flex-1 rounded-xl shadow-md p-5 sm:p-6 md:p-8 flex flex-col">
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">
            Update Profile
          </h3>
          <form className="space-y-4 flex-1" onSubmit={handleDetailsSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={userData.email}
                disabled
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-600 bg-gray-100 cursor-not-allowed text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Registration Number
              </label>
              <input
                type="text"
                value={userData.registrationNumber}
                disabled
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-600 bg-gray-100 cursor-not-allowed text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={detailsForm.fullName}
                onChange={handleDetailChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                id="phoneNo"
                type="tel"
                value={detailsForm.phoneNo}
                onChange={handleDetailChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className={`w-full font-semibold py-2 rounded-md transition-all text-sm ${
                  isUpdatingProfile
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {isUpdatingProfile ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating Profile...
                  </div>
                ) : (
                  "Update Info"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-white flex-1 rounded-xl shadow-md p-5 sm:p-6 md:p-8 flex flex-col">
          <h3 className="text-xl font-semibold text-red-600 mb-4">
            Change Password
          </h3>
          <form className="space-y-4 flex-1" onSubmit={handlePasswordSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">
                Old Password
              </label>
              <input
                id="oldPassword"
                type="password"
                value={passwordForm.oldPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={isChangingPassword}
                className={`w-full font-semibold py-2 rounded-md transition-all text-sm ${
                  isChangingPassword
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isChangingPassword ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Changing Password...
                  </div>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
