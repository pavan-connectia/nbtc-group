import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const homeApi = createApi({
  reducerPath: "home",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getHome: builder.query({
      query: () => "/home",
    }),
  }),
});
export const { useGetHomeQuery } = homeApi;
