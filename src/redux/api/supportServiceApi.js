import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const supportServiceApi = createApi({
  reducerPath: "supportService",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getSupportService: builder.query({
      query: () => ({ url: "/support-service" }),
    }),
  }),
});
export const { useGetSupportServiceQuery } = supportServiceApi;
