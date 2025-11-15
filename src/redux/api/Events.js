import { createApi } from "@reduxjs/toolkit/query/react";
import { EVENTS_ENDPOINTS } from "../../utils/ApiUrls";
import { axiosBaseQuery } from "../../utils/axios";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: (params = {}) => ({
        url: EVENTS_ENDPOINTS.GET_ALL,
        method: "GET",
        params,
      }),
      providesTags: ["Events"],
    }),

    registerEvent: builder.mutation({
      query: (data) => ({
        url: EVENTS_ENDPOINTS.REGISTER,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),

    getStudentRegisteredEvents: builder.query({
      query: (params = {}) => ({
        url: EVENTS_ENDPOINTS.STUDENT_REGISTERED,
        method: "GET",
        params,
      }),
      providesTags: ["Events"],
    }),

    createEvent: builder.mutation({
      query: (data) => ({
        url: EVENTS_ENDPOINTS.CREATE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),

    updateEvent: builder.mutation({
      query: (data) => ({
        url: EVENTS_ENDPOINTS.UPDATE,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `${EVENTS_ENDPOINTS.DELETE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useRegisterEventMutation,
  useGetStudentRegisteredEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
