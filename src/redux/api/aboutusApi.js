import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const aboutusApi = createApi({
  reducerPath: "aboutus",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAboutus: builder.query({
      query: () => ({ url: "/aboutus", params: { display: true } }),
    }),
  }),
});
export const { useGetAboutusQuery } = aboutusApi;
