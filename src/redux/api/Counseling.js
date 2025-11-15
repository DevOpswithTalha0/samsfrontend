import { createApi } from "@reduxjs/toolkit/query/react";
import { COUNSELING_ENDPOINTS } from "../../utils/ApiUrls";
import { axiosBaseQuery } from "../../utils/axios";

export const counselingApi = createApi({
  reducerPath: "counselingApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Counseling"],
  endpoints: (builder) => ({
    getAllCounselingDetails: builder.query({
      query: (params = {}) => ({
        url: COUNSELING_ENDPOINTS.GET_ALL_DETAILS,
        method: "GET",
        params,
      }),
      providesTags: ["Counseling"],
    }),

    registerCounselor: builder.mutation({
      query: (data) => ({
        url: COUNSELING_ENDPOINTS.REGISTER_COUNSELOR,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Counseling"],
    }),

    addCounselor: builder.mutation({
      query: (data) => ({
        url: COUNSELING_ENDPOINTS.ADD_COUNSELOR,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Counseling"],
    }),

    updateCounselor: builder.mutation({
      query: ({ id, updateData }) => ({
        url: COUNSELING_ENDPOINTS.UPDATE_COUNSELOR,
        method: "PUT",
        body: { id, updateData },
      }),
      invalidatesTags: ["Counseling"],
    }),

    deleteCounselor: builder.mutation({
      query: (id) => ({
        url: `${COUNSELING_ENDPOINTS.DELETE_COUNSELOR}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Counseling"],
    }),

    getStudentSessions: builder.query({
      query: (params = {}) => ({
        url: COUNSELING_ENDPOINTS.GET_STUDENT_SESSIONS,
        method: "GET",
        params,
      }),
      providesTags: ["Counseling"],
    }),

    updateStudentSession: builder.mutation({
      query: ({ id, updateData }) => ({
        url: COUNSELING_ENDPOINTS.UPDATE_STUDENT_SESSION,
        method: "PUT",
        body: { id, updateData },
      }),
      invalidatesTags: ["Counseling"],
    }),
  }),
});

export const {
  useGetAllCounselingDetailsQuery,
  useRegisterCounselorMutation,
  useAddCounselorMutation,
  useUpdateCounselorMutation,
  useDeleteCounselorMutation,
  useGetStudentSessionsQuery,
  useUpdateStudentSessionMutation,
} = counselingApi;
