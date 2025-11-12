import { createApi } from "@reduxjs/toolkit/query/react";
import { AUTH_ENDPOINTS } from "../../utils/ApiUrls";
import { axiosBaseQuery } from "../../utils/axios";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: AUTH_ENDPOINTS.LOGIN,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: AUTH_ENDPOINTS.REGISTER,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: AUTH_ENDPOINTS.LOGOUT,
        method: "POST",
      }),
    }),

    getUser: builder.query({
      query: () => ({
        url: AUTH_ENDPOINTS.GET_USER,
        method: "GET",
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: AUTH_ENDPOINTS.CHANGE_PASSWORD,
        method: "POST",
        body: data,
      }),
    }),

    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: AUTH_ENDPOINTS.USER_DETAILS,
        method: "PUT",
        body: data,
      }),
    }),

    getAllStudents: builder.query({
      query: (params) => ({
        url: AUTH_ENDPOINTS.GET_ALL_STUDENTS,
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserQuery,
  useChangePasswordMutation,
  useUpdateUserDetailsMutation,
  useGetAllStudentsQuery,
} = authApi;
