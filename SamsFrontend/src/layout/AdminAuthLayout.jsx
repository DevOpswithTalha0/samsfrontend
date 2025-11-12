import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "../redux/api/Auth";
import { useNavigate, Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer/index";
import { setUser } from "../redux/slices/User";
import { accessKey } from "../utils/constants";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem(accessKey);

  const { data, error, refetch } = useGetUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  useEffect(() => {
    if (data) {
      if (data?.statusCode === 200) {
        dispatch(
          setUser({
            user: data.data,
          })
        );
      } else {
        localStorage.removeItem(accessKey);
        navigate("/");
      }
    }
  }, [data, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      localStorage.removeItem(accessKey);
      navigate("/");
    }
  }, [error, navigate]);

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
