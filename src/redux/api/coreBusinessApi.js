import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const coreBusinessApi = createApi({
  reducerPath: "coreBusiness",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getCoreBusiness: builder.query({
      query: () => "/core-business",
      providesTags: ["CoreBusiness"],
    }),
    getCoreBusinessByName: builder.query({
      query: (name) => `/core-business/name/${name}`,
    }),
    getNavbarItems: builder.query({
      query: () => "/core-business/navbar",
    }),
  }),
});
export const {
  useGetCoreBusinessQuery,
  useGetNavbarItemsQuery,
  useGetCoreBusinessByNameQuery,
} = coreBusinessApi;
