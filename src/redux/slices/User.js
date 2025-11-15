import { createSlice } from "@reduxjs/toolkit";
import { accessKey, adminAccessKey } from "../../utils/constants";

const initialState = {
  user: null,
  token: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isAdmin = payload.user?.role === "admin";

      if (payload.token) {
        if (payload.user?.role === "admin") {
          localStorage.setItem(adminAccessKey, payload.token);
        } else {
          localStorage.setItem(accessKey, payload.token);
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem(accessKey);
      localStorage.removeItem(adminAccessKey);
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
