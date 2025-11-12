import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/Auth";
import { verificationApi } from "./api/Verification";
import { grievanceApi } from "./api/Grievance";
import { feedbackApi } from "./api/Feedback";
import { eventsApi } from "./api/Events";
import { counselingApi } from "./api/Counseling";
import userReducer from "./slices/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [verificationApi.reducerPath]: verificationApi.reducer,
    [grievanceApi.reducerPath]: grievanceApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [counselingApi.reducerPath]: counselingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(verificationApi.middleware)
      .concat(grievanceApi.middleware)
      .concat(feedbackApi.middleware)
      .concat(eventsApi.middleware)
      .concat(counselingApi.middleware),
});

export default store;
