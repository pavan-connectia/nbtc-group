import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const regionApi = createApi({
  reducerPath: "region",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getRegionByRegion: builder.query({
      query: (id) => ({
        url: `/region/region-info/region/${id}`,
      }),
    }),
    getAwardsByRegion: builder.query({
      query: (id) => ({
        url: `/region/region-awards/region/${id}`,
        params: { display: true },
      }),
    }),
    getProjectsByRegion: builder.query({
      query: (id) => ({
        url: `/region/region-projects/region/${id}`,
        params: { display: true },
      }),
    }),
    getRegionProjectsById: builder.query({
      query: (id) => ({
        url: `/region/region-projects/${id}`,
      }),
    }),
  }),
});
export const {
  useGetRegionByRegionQuery,
  useGetAwardsByRegionQuery,
  useGetProjectsByRegionQuery,
  useGetRegionProjectsByIdQuery,
} = regionApi;
