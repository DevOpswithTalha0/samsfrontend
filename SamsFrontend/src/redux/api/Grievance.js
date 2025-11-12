import { createApi } from "@reduxjs/toolkit/query/react";
import { GRIEVANCE_ENDPOINTS } from "../../utils/ApiUrls";
import { axiosBaseQuery } from "../../utils/axios";

export const grievanceApi = createApi({
  reducerPath: "grievanceApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Grievance"],
  endpoints: (builder) => ({
    submitGrievance: builder.mutation({
      query: (data) => ({
        url: GRIEVANCE_ENDPOINTS.SUBMIT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Grievance"],
    }),

    updateGrievance: builder.mutation({
      query: (data) => ({
        url: GRIEVANCE_ENDPOINTS.UPDATE,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Grievance"],
    }),

    deleteGrievance: builder.mutation({
      query: (id) => ({
        url: `${GRIEVANCE_ENDPOINTS.DELETE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Grievance"],
    }),

    getAllGrievances: builder.query({
      query: (params = {}) => ({
        url: GRIEVANCE_ENDPOINTS.GET_ALL,
        method: "GET",
        params,
      }),
      providesTags: ["Grievance"],
    }),
  }),
});

export const {
  useSubmitGrievanceMutation,
  useUpdateGrievanceMutation,
  useDeleteGrievanceMutation,
  useGetAllGrievancesQuery,
} = grievanceApi;
