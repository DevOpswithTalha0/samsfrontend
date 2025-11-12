import { createApi } from "@reduxjs/toolkit/query/react";
import { FEEDBACK_ENDPOINTS } from "../../utils/ApiUrls";
import { axiosBaseQuery } from "../../utils/axios";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Feedback"],
  endpoints: (builder) => ({
    addFeedback: builder.mutation({
      query: (data) => ({
        url: FEEDBACK_ENDPOINTS.ADD,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feedback"],
    }),

    getAllFeedbacks: builder.query({
      query: (params = {}) => ({
        url: FEEDBACK_ENDPOINTS.GET_ALL,
        method: "POST",
        body: params,
      }),
      providesTags: ["Feedback"],
    }),
  }),
});

export const { useAddFeedbackMutation, useGetAllFeedbacksQuery } = feedbackApi;
