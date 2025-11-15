import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { accessKey } from "../utils/constants";

const AuthLayout = () => {
  const token = localStorage.getItem(accessKey);

  if (token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthLayout;
