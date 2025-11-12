import axios from "axios";
import toast from "react-hot-toast";
import { accessKey, adminAccessKey } from "./constants";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, body, params }) => {
    try {
      let formData = { ...body };

      if (body?.file && typeof body?.file === "string") {
        formData = {
          ...formData,
          file: null,
        };
      }

      // Check if this is an authentication endpoint (login/register) that doesn't need token
      const isAuthEndpoint =
        url.includes("user/login") ||
        url.includes("user/register") ||
        url.includes("user/verify-email") ||
        url.includes("user/resend-verification-email");

      // Determine which token to use based on the current user's role
      // Check if user is admin by looking at localStorage
      const adminToken = localStorage.getItem(adminAccessKey);
      const userToken = localStorage.getItem(accessKey);

      // If admin token exists, use it; otherwise use user token
      const token = adminToken || userToken;

      // Debug logging
      console.log("API Request:", {
        url: baseUrl + url,
        method,
        isAuthEndpoint,
        hasAdminToken: !!adminToken,
        hasUserToken: !!userToken,
        usingAdminToken: !!adminToken,
        tokenLength: token?.length || 0,
        tokenPreview: token ? token.substring(0, 20) + "..." : "No token",
      });

      // Skip token validation for authentication endpoints
      if (!isAuthEndpoint) {
        // Don't send request if no token for protected endpoints
        if (!token) {
          console.error("No token available for request:", url);
          return {
            error: {
              status: 401,
              data: { message: "No authentication token available" },
            },
          };
        }

        // Validate token format (JWT should have 3 parts separated by dots)
        const tokenParts = token.split(".");
        if (tokenParts.length !== 3) {
          console.error(
            "Invalid token format:",
            token.substring(0, 20) + "..."
          );
          return {
            error: {
              status: 401,
              data: { message: "Invalid token format" },
            },
          };
        }
      }

      // Prepare headers
      const headers = {
        "Content-Type": body?.file ? "multipart/form-data" : "application/json",
      };

      // Only add Authorization header for non-auth endpoints
      if (!isAuthEndpoint && token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const result = await axios({
        url: baseUrl + url,
        method,
        data: formData,
        params,
        headers,
      });

      if (method !== "GET" && result?.data?.status !== 204) {
        if (result?.data?.statusCode === 200) {
          toast.success(result?.data?.message);
        } else {
          toast.error(result?.data?.message);
        }
      }

      return { data: result.data };
    } catch (error) {
      if (Array.isArray(error.response?.data?.message)) {
        toast.error(error.response?.data?.message[0]);
      } else {
        toast.error(error.response?.data?.message || "An error occurred!");
      }

      if (error.response?.status === 401) {
        const currentPath = window.location.pathname;
        const isAdminPath = currentPath.startsWith("/admin/");

        if (isAdminPath) {
          localStorage.removeItem(adminAccessKey);
          if (currentPath !== "/admin/login") {
            window.location.href = "/admin/login";
          }
        } else {
          localStorage.removeItem(accessKey);
          if (currentPath !== "/login" && currentPath !== "/signup") {
            window.location.href = "/login";
          }
        }
      }

      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };
