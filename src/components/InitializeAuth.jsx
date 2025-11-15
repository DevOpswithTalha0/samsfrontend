import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/User";
import { accessKey, adminAccessKey } from "../utils/constants";

const InitializeAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      // Check for admin token first
      const adminToken = localStorage.getItem(adminAccessKey);
      const userToken = localStorage.getItem(accessKey);

      if (adminToken) {
        // Set basic admin user structure
        const adminUser = {
          role: "admin",
        };
        dispatch(setUser({ user: adminUser, token: adminToken }));
      } else if (userToken) {
        // Set basic user structure - the actual user data will be fetched by the profile page
        const regularUser = {
          role: "user",
        };
        dispatch(setUser({ user: regularUser, token: userToken }));
      }
    };

    initializeAuth();
  }, [dispatch]);

  return null;
};

export default InitializeAuth;
