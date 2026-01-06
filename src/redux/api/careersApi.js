import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const careersApi = createApi({
  reducerPath: "careers",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    postCareersForm: builder.mutation({
      query: (formData) => ({
        url: "/careers/careers-form",
        method: "POST",
        body: formData,
      }),
    }),
    getCareersInfo: builder.query({
      query: () => "/careers/careers-info",
    }),
    getCareersOpening: builder.query({
      query: () => ({
        url: "/careers/careers-opening",
        params: { display: true },
      }),
    }),
  }),
});
export const {
  usePostCareersFormMutation,
  useGetCareersInfoQuery,
  useGetCareersOpeningQuery,
} = careersApi;
