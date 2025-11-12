import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utils/axios";
import { AUTH_ENDPOINTS } from "../../utils/ApiUrls";

export const verificationApi = createApi({
  reducerPath: "verificationApi",
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    verifyEmailToken: builder.query({
      query: (token) => ({
        url: `${AUTH_ENDPOINTS.VERIFY_EMAIL}/${token}`,
        method: "GET",
      }),
    }),
    resendVerificationEmail: builder.mutation({
      query: (data) => ({
        url: AUTH_ENDPOINTS.RESEND_VERIFICATION,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useVerifyEmailTokenQuery, useResendVerificationEmailMutation } =
  verificationApi;
