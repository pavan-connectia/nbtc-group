import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const brandsApi = createApi({
  reducerPath: "brands",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({ url: "/brands", params: { display: true } }),
    }),
    getBrandsById: builder.query({
      query: (id) => ({ url: `/brands/${id}` }),
    }),
  }),
});
export const { useGetBrandsQuery, useGetBrandsByIdQuery } = brandsApi;
