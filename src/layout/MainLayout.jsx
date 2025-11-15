import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "../redux/api/Auth";

import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer/index";
import { setUser } from "../redux/slices/User";
import { Outlet } from "react-router-dom";
import { accessKey } from "../utils/constants";

const MainLayout = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem(accessKey);
  const { data, refetch } = useGetUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(
        setUser({
          user: data.data,
          token: token, // Include token to maintain authentication state
        })
      );
    }
  }, [data, token, dispatch]);

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
